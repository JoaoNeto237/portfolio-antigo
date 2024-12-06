
    window.sr = ScrollReveal({reset: true});

    //Servicos
    sr.reveal('.titulo' , {duration: 2000, rotate:{ x:0, y:0, z:100}});
    sr.reveal('.servicos', {duration: 3000});




    function configuracoesTela(){
        const desktop = window.matchMedia("(min-width: 575 and max-width: 1024)");
    
        if(desktop.matches){
        }
        sr.reveal('.titulo' , {duration: 2000, rotate:{ x:0, y:0, z:100}});
        sr.reveal('.servicos', {duration: 3000});

    }