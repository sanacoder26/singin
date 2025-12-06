import { supabase } from './config.js'
import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/+esm'


// ---------------- SIGNUP ----------------

const signupForm = document.getElementById('myForm')
const nameInput = document.getElementById('name')
const emailInput = document.getElementById('exampleInputEmail1')
const passwordInput = document.getElementById('exampleInputPassword1')

if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const name = nameInput.value.trim()
    const email = emailInput.value.trim()
    const password = passwordInput.value

    if (!name || !email || !password) {
      Swal.fire("Error", "Fill all fields", "warning")
      return
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { userName: name }
        }
      })

      if (error) throw error

      Swal.fire("Success", "Account created! Now login", "success")
      signupForm.reset()

      setTimeout(() => {
        window.location.href = "login.html"
      }, 1500)

    } catch (err) {
      Swal.fire("Error", err.message, "error")
    }
  })
}


// ---------------- LOGIN ----------------

const loginForm = document.getElementById('loginForm')
const loginEmail = document.getElementById('loginEmail')
const loginPassword = document.getElementById('loginPassword')

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    if (!loginEmail.value || !loginPassword.value) {
      Swal.fire("Error", "Fill all fields", "warning")
      return
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail.value,
        password: loginPassword.value
      })

      if (error) throw error

      Swal.fire("Welcome", "Login successful", "success")

      console.log("SESSION:", data.session)

      setTimeout(() => {
        window.location.href = "profile.html"
      }, 1200)

    } catch (err) {
      Swal.fire("Login Failed", err.message, "error")
    }
  })
}


