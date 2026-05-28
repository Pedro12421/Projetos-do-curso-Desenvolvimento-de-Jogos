const background = document.getElementById('scenery');
const collected_cat = document.getElementById('collected-cat');
const collected_dog = document.getElementById('collected-dog');
const total_dog = document.getElementById('total-dog');
const total_cat = document.getElementById('total-cat');
const feedback_cat = document.getElementById('feedback-cat');
const feedback_dog = document.getElementById("feedback-dog");
const btn_show = document.getElementById('btn-show')
const btn_restart = document.getElementById('btn-reset')

const  audio_win = new Audio("src/win.mp3")

let current_cat = 0;
let current_dog = 0;
let max_cat = 10;
let max_dog = 10;
let checkWin

const max_pets_size = 30;
const min_pets_size = 25;
const reduce_width = 5;

const width_pet = [];
const height_pet = [];

const top_pets = [];
const left_pets = [];
//criar elementos
// let element = document.createElement('div');
// element.className = 'element-hidden';
// element.style.position = 'absolute';
// element.style.backgroundColor = 'blue';
// element.style.border = '1px solid red'

// element.style.top = '100px';
// element.style.left = '100px';
// element.style.width = '100px';
// element.style.height = '100px';
// background.appendChild(element)

//altura e largura do cenario
function getSceneSize() {
    return{
        width_scene: background.clientWidth,
        height_scene: background.clientHeight

    };
} 


//calcular tamanho do pet
function pet_size() {
  let  total_pets = max_cat + max_dog;
  for (let i = 0; i < total_pets; i++) {
    let random_size = Math.floor(Math.random() * (max_pets_size - min_pets_size + 1)) + min_pets_size
    height_pet.push(random_size);
    width_pet.push(random_size - reduce_width)
  }
}
//calcular a posição dos pets
function pet_position() {
    let total_pets = max_cat + max_dog;
    const scene = getSceneSize()
    for (let i = 0; i < total_pets; i++) {
        let pet_width = width_pet[i]; 
        let pet_height = height_pet[i];

        let max_left = scene.width_scene - pet_width * 1.3;
        let max_top = scene.height_scene - pet_height * 1.3;
        let min_left = pet_width * 1.3;
        let min_top = pet_height * 1.3;

        let random_left = Math.floor(Math.random() * (max_left  - min_left + 1)) + min_left;
        let random_top = Math.floor(Math.random() * (max_top - min_top + 1)) + min_top;

        top_pets.push(random_top);
        left_pets.push(random_left)
    }
}



function create_pet(type,quantity) {
    for (let i = 0; i < quantity; i++) {
        let pet = document.createElement('div');
        pet.className = 'pet-hidden';
        pet.style.position = 'absolute';
        pet.style.backgroundImage = `url(src/${type}.png)`
        pet.style.backgroundRepeat = 'no-repeat';
        pet.style.backgroundSize = "contain";
        pet.style.backgroundPosition = 'center'
       // pet.style.border = "2px solid blue";
        if (type == 'cat') {
            pet.style.top = top_pets[i] + "px";
            pet.style.left = left_pets[i] + 'px';
            pet.style.height = height_pet[i] + 'px';
            pet.style.width = width_pet[i] + 'px';
            pet.setAttribute('pet-type','cat')
        }else if(type == 'dog'){
            pet.style.top = top_pets[i + max_cat] +'px'
            pet.style.left = left_pets[i + max_cat] +'px'
            pet.style.height = height_pet[i + max_cat] +'px'
            pet.style.width = width_pet[i + max_cat] +'px'
            pet.setAttribute('pet-type','dog')
        }
        // pet.style.top = '100px';
        // pet.style.left = '100px';
        // pet.style.width = '100px';
        // pet.style.height = '100px';
        
        
        background.appendChild(pet)
    }
}
//remover pets
function remove_pets() {
    const pets = document.querySelectorAll('.pet-hidden')
    pets.forEach(function (ev) {
        ev.addEventListener('click',function(){
            const clicked_pet = ev.getAttribute('pet-type')
            if (clicked_pet == 'cat') {
                current_cat += 1;
                collected_cat.innerText = current_cat
                setTimeout(function () {
                    background.removeChild(ev)
                },500)
                if(max_cat == current_cat){
                    feedback_cat.style.color = 'green'
                }
     
            }else if(clicked_pet == 'dog'){
                current_dog += 1;
                collected_dog.innerText = current_dog;
                setTimeout(function(){
                    background.removeChild(ev)
                },500)
                if(max_dog == current_dog){
                    feedback_dog.style.color = 'green'
                }
            }
            
        })
    })
    
}
//mostrar pets
btn_show.addEventListener('click',function () {
    const pets_hidden = document.querySelectorAll(".pet-hidden");
    pets_hidden.forEach(function (el) {
        el.style.border = "5px solid black"
    })
    setTimeout(function () {
     pets_hidden.forEach(function (el) {
        el.style.border = 'none'
     })   
    },1000)
})
//reiniciar jogo
btn_restart.addEventListener('click',function () {
    window.location.reload();
})
//verificar vitoria
function check_win() {
    if (current_dog == max_dog && current_cat == max_cat) {
        setTimeout(function () {
            audio_win.play()
            let win_gif = document.createElement('div');
            win_gif.className = 'win-hidden';
            win_gif.style.position = 'absolute';
            win_gif.style.backgroundImage = 'url(src/win.gif)'
            win_gif.style.backgroundRepeat = 'no-repeat';
            win_gif.style.backgroundSize = "contain";
            win_gif.style.backgroundPosition = 'center';

            win_gif.style.top = '5vw';
            win_gif.style.left = '30vh';
            win_gif.style.height = '50vh';
            win_gif.style.width = '45vw';
            background.appendChild(win_gif);
            clearInterval(checkWin)
        },1000)
    }
}
//inicializar jogo
window.addEventListener('load',function () {
    pet_size();
    pet_position();
    console.log(top_pets);
    create_pet('cat',max_cat);
    create_pet('dog',max_dog);
    remove_pets();
    checkWin = setInterval(check_win,1000)
})
