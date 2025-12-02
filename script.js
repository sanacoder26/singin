import { supabase } from './config.js';
import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/+esm';

const form = document.getElementById('myForm');
const userName = document.getElementById('name');
const email = document.getElementById('exampleInputEmail1');
const password = document.getElementById('exampleInputPassword1');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); //  form submission clear 

    const name = userName.value.trim();
    const userEmail = email.value.trim();
    const userPassword = password.value;

    if (!name || !userEmail || !userPassword) {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Please fill all fields!'
        });
        return;
    }

    try {
        const { data, error } = await supabase.auth.signUp({
            email: userEmail,
            password: userPassword,
            options: { data: { userName: name } }
        });

        if (error) throw error;

        // SweetAlert after successful signup
        Swal.fire({
            icon: 'success',
            title: 'Sign Up Successful',
            text: 'Your account has been created! Please check your email.'
        });

        // Reset form
        form.reset();

        console.log('Supabase user data:', data);

    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.message
        });
    }
});
