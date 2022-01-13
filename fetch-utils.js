const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTk0ODIwNCwiZXhwIjoxOTU3NTI0MjA0fQ.jqvK0NeN6qBna_UCyT_2jgahLwFZ0_I-7T3QMQHJhvo';

const SUPABASE_URL = 'https://nvkeilaiioresqjruzbf.supabase.co';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function getUser() {
    return client.auth.session();
}

export async function getWorkshops() {
    const response = await client
        .from('workshops')
        .select('*, participants (*)');
    
    return checkError(response);    
}

export async function deleteParticipant(id) {
    const response = await client 
        .from('participants')
        .delete()
        .match({ id: id })
        .single();

    return checkError(response);
}

export async function createPartipant(participant) {
    const response = await client
        .from('participants ')
        .insert(participant);

    return checkError(response); 
}


export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../'); 
}

export async function redirectIfLoggedIn() {
    if (await getUser()) {
        location.replace('./workshops');
    }
}

export async function signupUser(email, password){
    const response = await client.auth.signUp({ email, password });
    
    return response.user;
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '../';
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
