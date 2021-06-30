const authSwitchLinks = document.querySelectorAll('.switch');
const authModals = document.querySelectorAll('.auth .modal');
const authWrapper = document.querySelector('.auth');
const registerForm=document.querySelector('.register');
const loginForm=document.querySelector('.login');
const signOut=document.querySelector('.sign-out');
// toggle auth modals
authSwitchLinks.forEach(link => {
  link.addEventListener('click', () => {
    authModals.forEach(modal => modal.classList.toggle('active'));
  });
});

//register form 
registerForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const email=registerForm.email.value;
    const password=registerForm.password.value;

    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then((user)=>{
        console.log("registered",user);
        registerForm.reset();
    })
    .catch((err)=>{
        registerForm.querySelector('.error').textContent=err.message;
    })
});

//login form
loginForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const email=loginForm.email.value;
    const password=loginForm.password.value;

    firebase.auth().signInWithEmailAndPassword(email,password)
    .then((user)=>{
        console.log("logged in",user);
        loginForm.reset();
    })
    .catch((err)=>{
        loginForm.querySelector('.error').textContent=err.message;
    })
});

//signOut
signOut.addEventListener('click',()=>{
    firebase.auth().signOut()
    .then(()=>{
        console.log("signed out");
    });
});



// setting up listener for forebease auth services  it listens when user log in and logs out 
// we do this to perform particular actions when log in log out happens 

firebase.auth().onAuthStateChanged((user)=>{
    if(user){
        //sign in and register pe yaha 
        console.log("inside user");
        authWrapper.classList.remove('open');
        authModals.forEach((modal)=>{
            modal.classList.remove('active');
        });
    }
    else{
        //sign out pe yaha aate h 
        console.log("outside user");
        authWrapper.classList.add('open');
        authModals[0].classList.add('active');
    }
});