var i = 0;
var j = 0;

function loadTrack(data){
    var url = data.src

    var audio_fx = null
    audio_fx = document.createElement('audio')
    audio_fx.setAttribute('src',url)
    audio_fx.load()
    audio_fx.addEventListener('loadeddata',function(){
        //alert("cargo")
        data.callBack(audio_fx)
    })
    audio_fx.addEventListener('error',function(){
        console.log("error cargando")
        data.callBack(null)
    })
}

function loadImg(data){
    var img = new Image()
    if(data.extra!=null&&data.extra!=undefined){
        img.setAttribute('f',data.extra.f)
    }
    img.onload = function(){
        img.onload = null
        img.onerror = null
        data.callBack(img)
    }
    img.onerror = function(){
        img.onload = null
        img.onerror = null
        data.callBack(null)
        console.log("error loading img: "+img.src)        
    }
    img.src = data.src
}

function getE(idname){
    return document.getElementById(idname)
}


var global_data = [{
    title:'Estado de Situación Financiera (Balance General)',
    description:'Muestra los activos, pasivos y patrimonio de la entidad en una fecha determinada.',
    audio:null
},{
    title:'Estado de Resultados Integral',
    description:'Presenta los ingresos, costos, gastos y utilidad o pérdida del período.',
    audio:null
},{
    title:'Estado de Cambios en el Patrimonio',
    description:'Refleja las variaciones en el patrimonio de los propietarios durante el período.',
    audio:null
},{
    title:'Estado de Flujos de Efectivo',
    description:'Los movimientos de dinero en efectivo, clasificados en:',
    description2:'<ul><li>Actividades operativas</li><li>Actividades de inversión</li><li>Actividades de financiación</li></ul>',
    audio:null
}]


function overZona(){
    over_mp3.currentTime = 0
    over_mp3.play()
}

function setRollo(){
    var rollos = getE('rollo-wrap').getElementsByClassName('rollo-container')
    for(i = 0;i<rollos.length;i++){
        rollos[i].style.height = window.innerHeight+'px'
    }
}