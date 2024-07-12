//Menu hamburguer
document.addEventListener('DOMContentLoaded', () => {

    const icone = document.querySelector('.icone_nav');
    const navList = document.querySelector('.nav_list');

    icone.addEventListener('click', () => {
        navList.style.display = navList.style.display === 'block' ? 'none' : 'block';
    });
});

//Atribui sr a variavel global window e reseta o scrollreveal para verdadeiro
window.sr = ScrollReveal({reset: true});

//Chama o reveal pela variavel passando a classe e a duracao em milissegundos
sr.reveal('.habilidades', {
    rotate:{x:10 ,y:80, z:0,
    duration: 2000

}});
sr.reveal('.container-img',{duration: 1000});
sr.reveal('.img1',{duration: 1000});
sr.reveal('.img2',{duration: 2000});
sr.reveal('.img3',{duration: 3000});
sr.reveal('.img4',{duration: 4000});
sr.reveal('.img5',{duration: 5000});
sr.reveal('.img6',{duration: 6000});
sr.reveal('.img7',{duration: 7000});
sr.reveal('.img8',{duration: 8000});
sr.reveal('.img9',{duration: 9000});
sr.reveal('button', {
    rotate:{ x:0,y:100,z:0,
    delay:5000,
    distance:'30px',
    duration: 3000}});

sr.reveal('.h2skills', {duration: 1000});
sr.reveal('.lista-soft', {duration: 3000});



function configuracoesTela(){
    const desktop = window.matchMedia("(min-width: 1024)");

    if(desktop.matches){
                
        sr.reveal('.container-img',{duration: 1000});
        sr.reveal('.img1',{duration: 2000});
        sr.reveal('.img2',{duration: 2000});
        sr.reveal('.img3',{duration: 2000});
        sr.reveal('.img4',{duration: 2000});
        sr.reveal('.img5',{duration: 2000});
        sr.reveal('.img6',{duration: 2000});
        sr.reveal('.img7',{duration: 2000});
        sr.reveal('.img8',{duration: 2000});
        sr.reveal('.img9',{duration: 2000});
        sr.reveal('button', {
            rotate:{ x:0,y:100,z:0,
            delay:5000,
            distance:'30px',
            duration: 3000}});

        sr.reveal('.h2skills', {duration: 1000});
        sr.reveal('.lista-soft', {duration: 3000});

    }
}