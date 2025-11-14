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
    audio:null,
    visto:false
},{
    title:'Estado de Resultados Integral',
    description:'Presenta los ingresos, costos, gastos y utilidad o pérdida del período.',
    audio:null,
    visto:false
},{
    title:'Estado de Cambios en el Patrimonio',
    description:'Refleja las variaciones en el patrimonio de los propietarios durante el período.',
    audio:null,
    visto:false
},{
    title:'Estado de Flujos de Efectivo',
    description:'Los movimientos de dinero en efectivo, clasificados en:',
    description2:'<ul><li>Actividades operativas</li><li>Actividades de inversión</li><li>Actividades de financiación</li></ul>',
    audio:null,
    visto:false
}]

var modulos_vistos = false;

function overZona(){
    over_mp3.currentTime = 0
    over_mp3.play()
}

var thumbnails_coll = []
function overThumbnail(t){
    for(i = 0;i<thumbnails_coll.length;i++){
        thumbnails_coll[i].className = 'thumbnail'
    }
    thumbnails_coll[t-1].className = 'thumbnail thumbnail-over'

    if(t==1){
        thumbnails_coll[t].className = 'thumbnail thumbnail-over2'
    }else if(t==thumbnails_coll.length){
        thumbnails_coll[t-2].className = 'thumbnail thumbnail-over2'
    }else{
        thumbnails_coll[t].className = 'thumbnail thumbnail-over2'
        thumbnails_coll[t-2].className = 'thumbnail thumbnail-over2'
    }

    over_mp3.currentTime = 0
    over_mp3.play()
}

function outThumbnail(){
    for(i = 0;i<thumbnails_coll.length;i++){
        thumbnails_coll[i].className = 'thumbnail'
    }
}

var actual_rollo = 1
var animacion_rollo = null;
var animating_rollo = false;
var global_audio = null;

function clickThumbnail(t){
    if(!animating_rollo){
        animating_rollo = true;
        if(global_audio!=null){
            global_audio.pause()
        }
        intro_mp3.pause()
        intro_mp3.onended = null

        getE('rollo-wrap').className = 'rollo-'+actual_rollo+'-'+t
        actual_rollo = t
    
        getE('informacion').className = 'informacion-off'

        animacion_rollo = setTimeout(function(){
            clearTimeout(animacion_rollo)
            animacion_rollo = null;

            var html_str = '<h2>'+global_data[t-1].title+'</h2>'+'<p>'+global_data[t-1].description+'</p>'
            if(global_data[t-1].description2!=null&&global_data[t-1].description2!=undefined){
                html_str+=global_data[t-1].description2
            }
            getE('informacion-txt').innerHTML = html_str
            getE('informacion').className = 'informacion-on'
            
            animating_rollo = false;
            global_audio = global_data[t-1].audio
            global_data[t-1].visto = true
            global_audio.currentTime = 0
            global_audio.play()
            transicion_mp3.play()
        },750)

        click_mp3.currentTime = 0
        click_mp3.play()
    }
}

function setRollo(){
    var rollos = getE('rollo-wrap').getElementsByClassName('rollo-container')
    for(i = 0;i<rollos.length;i++){
        rollos[i].style.height = window.innerHeight+'px'
    }
    thumbnails_coll = getE('thumbnails').getElementsByClassName('thumbnail')
}