import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

export const getFileUrl = (bucket, path) => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
};

export const uploadFile = async (file, bucket, path) => {
  const { data, error } = await supabase.storage.from(bucket).upload(path, file);
  if (error) throw error;
  return data.path;
};

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

### perspective_files

| name           | type                     | format | required |
|----------------|--------------------------|--------|----------|
| id             | bigint                   | number | true     |
| perspective_id | integer                  | number | true     |
| file_name      | text                     | string | true     |
| file_url       | text                     | string | true     |
| uploaded_at    | timestamp with time zone | string | false    |

### perspectives

| name        | type                     | format | required |
|-------------|--------------------------|--------|----------|
| id          | bigint                   | number | true     |
| domain_id   | integer                  | number | true     |
| name        | text                     | string | true     |
| description | text                     | string | false    |
| created_at  | timestamp with time zone | string | false    |
| updated_at  | timestamp with time zone | string | false    |
| created_by  | integer                  | number | false    |
| views       | integer                  | number | false    |

### users

| name                 | type                     | format  | required |
|----------------------|--------------------------|---------|----------|
| id                   | bigint                   | number  | true     |
| username             | text                     | string  | true     |
| email                | text                     | string  | true     |
| password_hash        | text                     | string  | true     |
| first_name           | text                     | string  | false    |
| last_name            | text                     | string  | false    |
| avatar_url           | text                     | string  | false    |
| bio                  | text                     | string  | false    |
| date_of_birth        | timestamp with time zone | string  | false    |
| phone_number         | text                     | string  | false    |
| role                 | text                     | string  | false    |
| status               | text                     | string  | false    |
| language_preference  | text                     | string  | false    |
| timezone             | text                     | string  | false    |
| two_factor_enabled   | boolean                  | boolean | false    |
| last_login           | timestamp with time zone | string  | false    |
| failed_login_attempts| integer                  | number  | false    |
| reset_token          | text                     | string  | false    |
| friends              | uuid[]                   | array   | false    |
| following            | uuid[]                   | array   | false    |
| followers            | uuid[]                   | array   | false    |
| preferences          | jsonb                    | object  | false    |
| created_at           | timestamp with time zone | string  | false    |
| updated_at           | timestamp with time zone | string  | false    |

### domains

| name         | type   | format | required |
|--------------|--------|--------|----------|
| id           | bigint | number | true     |
| name         | text   | string | false    |
| type         | text   | string | false    |
| description  | text   | string | false    |
| perspectives | jsonb  | object | false    |

*/

// Perspective Files Hooks
export const usePerspectiveFiles = () => useQuery({
    queryKey: ['perspective_files'],
    queryFn: () => fromSupabase(supabase.from('perspective_files').select('*')),
});

export const useAddPerspectiveFile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newFile) => fromSupabase(supabase.from('perspective_files').insert([newFile])),
        onSuccess: () => {
            queryClient.invalidateQueries(['perspective_files']);
        },
    });
};

export const useUpdatePerspectiveFile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, updates }) => fromSupabase(supabase.from('perspective_files').update(updates).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries(['perspective_files']);
        },
    });
};

export const useDeletePerspectiveFile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('perspective_files').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries(['perspective_files']);
        },
    });
};

// Perspectives Hooks
export const usePerspectives = () => useQuery({
    queryKey: ['perspectives'],
    queryFn: () => fromSupabase(supabase.from('perspectives').select('*')),
});

export const usePerspective = (id) => useQuery({
    queryKey: ['perspectives', id],
    queryFn: () => fromSupabase(supabase.from('perspectives').select('*').eq('id', id).single()),
});

export const useAddPerspective = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newPerspective) => fromSupabase(supabase.from('perspectives').insert([newPerspective])),
        onSuccess: () => {
            queryClient.invalidateQueries(['perspectives']);
        },
    });
};

export const useUpdatePerspective = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, updates }) => fromSupabase(supabase.from('perspectives').update(updates).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries(['perspectives']);
        },
    });
};

export const useDeletePerspective = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('perspectives').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries(['perspectives']);
        },
    });
};

// Users Hooks
export const useUsers = () => useQuery({
    queryKey: ['users'],
    queryFn: () => fromSupabase(supabase.from('users').select('*')),
});

export const useUser = (id) => useQuery({
    queryKey: ['users', id],
    queryFn: () => fromSupabase(supabase.from('users').select('*').eq('id', id).single()),
});

export const useAddUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newUser) => fromSupabase(supabase.from('users').insert([newUser])),
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
        },
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, updates }) => fromSupabase(supabase.from('users').update(updates).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
        },
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('users').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
        },
    });
};

// Domains Hooks
export const useDomains = () => useQuery({
    queryKey: ['domains'],
    queryFn: () => fromSupabase(supabase.from('domains').select('*')),
});

export const useDomain = (id) => useQuery({
    queryKey: ['domains', id],
    queryFn: () => fromSupabase(supabase.from('domains').select('*').eq('id', id).single()),
});

export const useAddDomain = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newDomain) => fromSupabase(supabase.from('domains').insert([newDomain])),
        onSuccess: () => {
            queryClient.invalidateQueries(['domains']);
        },
    });
};

export const useUpdateDomain = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, updates }) => fromSupabase(supabase.from('domains').update(updates).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries(['domains']);
        },
    });
};

export const useDeleteDomain = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('domains').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries(['domains']);
        },
    });
};
