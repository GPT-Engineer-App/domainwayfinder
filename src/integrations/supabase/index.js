import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = 'https://yikgsmwivhpchmupolcw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlpa2dzbXdpdmhwY2htdXBvbGN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI4NjU0MDMsImV4cCI6MjAzODQ0MTQwM30.v9J_W-BwYucTY61d-23mSfiDmQhgD7a6oFJzHIwOfnA';
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
| domain_id | int8   | number | true     |
| name      | text   | string | false    |
| data      | jsonb  | json   | false    |

### users

| name     | type | format | required |
|----------|------|--------|----------|
| id       | int8 | number | true     |
| username | text | string | false    |
| email    | text | string | false    |
| password | text | string | false    |

### domains

| name         | type   | format | required |
|--------------|--------|--------|----------|
| id           | int8   | number | true     |
| name         | text   | string | false    |
| type         | text   | string | false    |
| description  | text   | string | false    |
| perspectives | jsonb  | json   | false    |

*/

// Perspectives hooks
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
            queryClient.invalidateQueries('perspectives');
        },
    });
};

export const useUpdatePerspective = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('perspectives').update(updateData).eq('id', id)),
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

// Users hooks
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
            queryClient.invalidateQueries('users');
        },
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('users').update(updateData).eq('id', id)),
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

// Domains hooks
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
            queryClient.invalidateQueries('domains');
        },
    });
};

export const useUpdateDomain = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('domains').update(updateData).eq('id', id)),
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
