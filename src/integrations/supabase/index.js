import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

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

### perspectives

| name      | type   | format | required |
|-----------|--------|--------|----------|
| id        | int8   | number | true     |
| domain_id | int8   | number | false    |
| name      | text   | string | false    |
| data      | jsonb  | json   | false    |

### users

| name                 | type                    | format   | required |
|----------------------|-------------------------|----------|----------|
| id                   | int8                    | number   | true     |
| username             | text                    | string   | true     |
| email                | text                    | string   | true     |
| password_hash        | text                    | string   | true     |
| first_name           | text                    | string   | false    |
| last_name            | text                    | string   | false    |
| avatar_url           | text                    | string   | false    |
| bio                  | text                    | string   | false    |
| date_of_birth        | timestamp with time zone| string   | false    |
| phone_number         | text                    | string   | false    |
| role                 | text                    | string   | false    |
| status               | text                    | string   | false    |
| language_preference  | text                    | string   | false    |
| timezone             | text                    | string   | false    |
| two_factor_enabled   | boolean                 | boolean  | false    |
| last_login           | timestamp with time zone| string   | false    |
| failed_login_attempts| integer                 | number   | false    |
| reset_token          | text                    | string   | false    |
| friends              | uuid[]                  | array    | false    |
| following            | uuid[]                  | array    | false    |
| followers            | uuid[]                  | array    | false    |
| preferences          | jsonb                   | json     | false    |
| created_at           | timestamp with time zone| string   | false    |
| updated_at           | timestamp with time zone| string   | false    |

### domains

| name         | type  | format | required |
|--------------|-------|--------|----------|
| id           | int8  | number | true     |
| name         | text  | string | false    |
| type         | text  | string | false    |
| description  | text  | string | false    |
| perspectives | jsonb | json   | false    |

*/

// Hooks for perspectives
export const usePerspectives = () => useQuery({
    queryKey: ['perspectives'],
    queryFn: () => fromSupabase(supabase.from('perspectives').select('*')),
});

export const useAddPerspective = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newPerspective) => fromSupabase(supabase.from('perspectives').insert([newPerspective])),
        onSuccess: () => {
            queryClient.invalidateQueries('perspectives');
        },
    });
};

export const useUpdatePerspective = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, updates }) => fromSupabase(supabase.from('perspectives').update(updates).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('perspectives');
        },
    });
};

export const useDeletePerspective = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('perspectives').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('perspectives');
        },
    });
};

// Hooks for users
export const useUsers = () => useQuery({
    queryKey: ['users'],
    queryFn: () => fromSupabase(supabase.from('users').select('*')),
});

export const useAddUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newUser) => fromSupabase(supabase.from('users').insert([newUser])),
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, updates }) => fromSupabase(supabase.from('users').update(updates).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('users').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};

// Hooks for domains
export const useDomains = () => useQuery({
    queryKey: ['domains'],
    queryFn: () => fromSupabase(supabase.from('domains').select('*')),
});

export const useAddDomain = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newDomain) => fromSupabase(supabase.from('domains').insert([newDomain])),
        onSuccess: () => {
            queryClient.invalidateQueries('domains');
        },
    });
};

export const useUpdateDomain = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, updates }) => fromSupabase(supabase.from('domains').update(updates).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('domains');
        },
    });
};

export const useDeleteDomain = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('domains').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('domains');
        },
    });
};