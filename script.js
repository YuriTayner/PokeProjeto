function init() {  
  const elements = {
    wrapper: document.querySelector('.wrapper'),
    mapCover: document.querySelector('.map-cover'), 
    player: document.querySelector('.player'), 
    button: document.querySelector('button')
  }

  const distanceBetween = (a, b) => Math.round(Math.sqrt(Math.pow((a.x - b.x), 2) + Math.pow((a.y - b.y), 2)))
  const randomN = max => Math.ceil(Math.random() * max)
  const randomN2 = max2 => Math.ceil(Math.random() * max2)
  const randomN3 = max3 => Math.ceil(Math.random() * max3)
  const px = n => `${n}px`
  const setPos = ({ el, x, y }) => Object.assign(el.style, { left: `${x}px`, top: `${y}px` })

  const setSize = ({ el, w, h, d }) => {
    const m = d || 1
    if (w) el.style.width = px(w * m)
    if (h) el.style.height = px(h * m)
  }

  const player = {
    id: 'red',
    x: 0, y: 0,
    frameOffset: 1,
    animationTimer: null,
    el: elements.player,
    sprite: {
      el: document.querySelector('.player').childNodes[1],
      x: 0, y: 0
    },
    walkingDirection: '',
    walkingInterval: null,
    pause: false,
    buffer: 20,
    move: { x: 0, y: 0 } 
  }

  const settings = {
    d: 20,
    offsetPos: {
      x: 0, y: 0,
    },
    elements: [],
    bunnies: [],
    cyndaquills: [],
    nindorans: [],
    psyducks:[],
    omanytes:[],
    map: {
      el: document.querySelector('.map'),
      walls: [],
      w: 20 * 200,
      h: 20 * 200,
      x: 0, y: 0,
    },
    transitionTimer: null,
    isWindowActive: true,
    controlPos: { x: 0, y: 0 },
    bunnyRadarSize: 0,
    sadBunnies: []
  }

  const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if(APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }
}



  const triggerNidoranWalk = nidoran => {
    nidoran.animationTimer = setInterval(()=> {
      if (!settings.isWindowActive) return
      const dir = ['up', 'down', 'right', 'left'][Math.floor(Math.random() * 4)]
      const { d } = settings

      nidoran.move = {
        down: { x: 0, y: d },
        up: { x: 0, y: -d },
        right: { x: d, y: 0 },
        left: { x: -d, y: 0 }
      }[dir]

      walk(nidoran, dir)
      setTimeout(()=> walk(nidoran, dir), 300)
      setTimeout(()=> walk(nidoran, dir), 600)
      setTimeout(()=> stopSprite(nidoran), 900)
    }, 2000)
  }

  const triggerCyndaquillWalk = cyndaquill => {
    cyndaquill.animationTimer = setInterval(()=> {
      if (!settings.isWindowActive) return
      const dir = ['up', 'down', 'right', 'left'][Math.floor(Math.random() * 4)]
      const { d } = settings

      cyndaquill.move = {
        down: { x: 0, y: d },
        up: { x: 0, y: -d },
        right: { x: d, y: 0 },
        left: { x: -d, y: 0 }
      }[dir]

      walk(cyndaquill, dir)
      setTimeout(()=> walk(cyndaquill, dir), 300)
      setTimeout(()=> walk(cyndaquill, dir), 600)
      setTimeout(()=> stopSprite(cyndaquill), 900)
    }, 2000)
  }

  const triggerPsyduckWalk = psyduck => {
    psyduck.animationTimer = setInterval(()=> {
      if (!settings.isWindowActive) return
      const dir = ['up', 'down', 'right', 'left'][Math.floor(Math.random() * 4)]
      const { d } = settings

      psyduck.move = {
        down: { x: 0, y: d },
        up: { x: 0, y: -d },
        right: { x: d, y: 0 },
        left: { x: -d, y: 0 }
      }[dir]

      walk(psyduck, dir)
      setTimeout(()=> walk(psyduck, dir), 300)
      setTimeout(()=> walk(psyduck, dir), 600)
      setTimeout(()=> stopSprite(psyduck), 900)
    }, 2000)
  }

  const triggerOmanyteWalk = omanyte => {
    omanyte.animationTimer = setInterval(()=> {
      if (!settings.isWindowActive) return
      const dir = ['up', 'down', 'right', 'left'][Math.floor(Math.random() * 4)]
      const { d } = settings

      omanyte.move = {
        down: { x: 0, y: d },
        up: { x: 0, y: -d },
        right: { x: d, y: 0 },
        left: { x: -d, y: 0 }
      }[dir]

      walk(omanyte, dir)
      setTimeout(()=> walk(omanyte, dir), 300)
      setTimeout(()=> walk(omanyte, dir), 600)
      setTimeout(()=> stopSprite(omanyte), 900)
    }, 2000)
  }

  const addNindoran = () => {
      const nidoran = {
        id: 32,
        x: 2860, y: 740,
        frameOffset: 1,
        animationTimer: null,
        el: Object.assign(document.createElement('div'), 
        { 
          className: 'sprite-container',
          innerHTML: '<div class="nidoran sprite"></div>'
        }),
        sprite: {
            el: null,
            x: 0, y: 0
          },
        buffer: 30,
      }
      settings.nindorans.push(nidoran)
      settings.map.el.appendChild(nidoran.el)
      nidoran.sprite.el = nidoran.el.childNodes[0]
      nidoran.el.style.zIndex = nidoran.y
      setPos(nidoran)

      const pokemon_Nidoran = document.querySelector('.nidoran');
      pokemon_Nidoran.addEventListener("click", function() {
        pokedexDisplay.innerHTML = `id:${nidoran.id}`;
      });

      if (randomN(2) === 2) triggerNidoranWalk(nidoran)
    }

  const addCyndaquill = () => {
    const cyndaquill = {
      id: 155,
      x: 1280, y: 720,
      frameOffset: 1,
      animationTimer: null,
      el: Object.assign(document.createElement('div'), 
      { 
        className: 'sprite-container',
        innerHTML: '<div class="cyndaquill sprite"></div>'
      }),
      sprite: {
          el: null,
          x: 0, y: 0
        },
      buffer: 30,
    }
    settings.cyndaquills.push(cyndaquill)
    settings.map.el.appendChild(cyndaquill.el)
    cyndaquill.sprite.el = cyndaquill.el.childNodes[0]
    cyndaquill.el.style.zIndex = cyndaquill.y
    setPos(cyndaquill)

    const pokemon_Cyndaquill = document.querySelector('.cyndaquill');
      pokemon_Cyndaquill.addEventListener("click", function() {
        pokedexDisplay.innerHTML = `id:${cyndaquill.id}`;
      });

    if (randomN2(2) === 2) triggerCyndaquillWalk(cyndaquill)
  }

  const addPsyduck = () => {
      const psyduck = {
        id: 54,
        x: 3360, y: 740,
        frameOffset: 1,
        animationTimer: null,
        el: Object.assign(document.createElement('div'), 
        { 
          className: 'sprite-container',
          innerHTML: '<div class="psyduck sprite"></div>'
        }),
        sprite: {
            el: null,
            x: 0, y: 0
          },
        buffer: 30,
      }
      settings.psyducks.push(psyduck)
      settings.map.el.appendChild(psyduck.el)
      psyduck.sprite.el = psyduck.el.childNodes[0]
      psyduck.el.style.zIndex = psyduck.y
      setPos(psyduck)

      const pokemon_Psyduck = document.querySelector('.psyduck');
      pokemon_Psyduck.addEventListener("click", function() {
        pokedexDisplay.innerHTML = `id:${psyduck.id}`;
      });

      if (randomN3(2) === 2) triggerPsyduckWalk(psyduck)
    }

    const addOmanyte = () => {
      const omanyte = {
        id: 138,
        x: 720, y: 740,
        frameOffset: 1,
        animationTimer: null,
        el: Object.assign(document.createElement('div'), 
        { 
          className: 'sprite-container',
          innerHTML: '<div class="omanyte sprite"></div>'
        }),
        sprite: {
            el: null,
            x: 0, y: 0
          },
        buffer: 30,
      }
      settings.omanytes.push(omanyte)
      settings.map.el.appendChild(omanyte.el)
      omanyte.sprite.el = omanyte.el.childNodes[0]
      omanyte.el.style.zIndex = omanyte.y
      setPos(omanyte)

      const pokemon_Omanyte = document.querySelector('.omanyte');
      pokemon_Omanyte.addEventListener("click", function() {
        pokedexDisplay.innerHTML = `id:${omanyte.id}`;
      });

      if (randomN3(2) === 2) triggerOmanyteWalk(omanyte)
    }

  const addSnorlax = () => {
    const snorlax = { 
      id: 143,
      x: 3880, y: 1740,
      el: Object.assign(document.createElement('div'), 
      { 
        className: 'snorlax',
        innerHTML: '<div></div>' 
      }),
      buffer: 80,
    }
    settings.map.el.appendChild(snorlax.el)
    settings.elements.push(snorlax)
    snorlax.el.style.zIndex = 1
    setPos(snorlax)

    const pokemon_Snorlax = document.querySelector('.snorlax');
  
    pokemon_Snorlax.addEventListener("click", function() {
      pokedexDisplay.innerHTML = `id:${snorlax.id}`;
    });
  }

  const addLapras = () => {
    const lapras = { 
      id: 131,
      x: 1040, y: 1680,
      el: Object.assign(document.createElement('div'), 
      { 
        className: 'lapras',
        innerHTML: '<div></div>' 
      }),
      buffer: 80,
    }
    settings.map.el.appendChild(lapras.el)
    settings.elements.push(lapras)
    lapras.el.style.zIndex = 1
    setPos(lapras)

    const pokemon_Lapras = document.querySelector('.lapras');
  
    pokemon_Lapras.addEventListener("click", function() {
      pokedexDisplay.innerHTML = `id:${lapras.id}`;
    });
  }

  const setBackgroundPos = ({ el, x, y }) => {
    el.style.setProperty('--bx', px(x))
    el.style.setProperty('--by', px(y))
  }

  const animateSprite = (actor, dir) => {
    const h = -32 * 2
    actor.sprite.y = {
      down: 0,
      up: h,
      right: h * 2,
      left: h * 3
    }[dir]
    actor.frameOffset = actor.frameOffset === 1 ? 2 : 1
    actor.sprite.x = actor.frameOffset * (2 * -20)
    setBackgroundPos(actor.sprite)
  }

  const noWall = actor => {
    const newPos = {...actor}
    newPos.x += actor.move.x
    newPos.y += actor.move.y
    
    if ([
      ...settings.bunnies.filter(el => el.id !== actor.id), 
      ...settings.elements].some(el => {
      return distanceBetween(el, newPos) <= el.buffer 
            && distanceBetween(el, actor) > el.buffer
    })) return

    const buffer = 40
    const noWallX = actor.move.x > 0
      ? newPos.x + buffer < settings.map.w 
      : newPos.x - buffer > 0 
    const noWallY = actor.move.y > 0
      ? newPos.y < settings.map.h - buffer
      : newPos.y - buffer > 0 

    return noWallX && noWallY
  }

  const walk = (actor, dir) => {
    if (!dir || player.pause || !settings.isWindowActive) return
    if (noWall(actor)) {
      animateSprite(actor, dir)
      actor.x += actor.move.x
      actor.y += actor.move.y
      if (actor === player) {
        positionMap()
        setPos(settings.map)
        player.el.parentNode.style.zIndex = player.y
      } else {
        setPos(actor)
        actor.el.style.zIndex = actor.y
      }
    } else {
      stopSprite(actor)
    }
  }

  const updateOffset = () => {
    const { width, height } = elements.wrapper.getBoundingClientRect()
    settings.offsetPos = {
      x: (width / 2),
      y: (height / 2),
    }
  }

  const positionMap = () => {
    settings.map.x = settings.offsetPos.x - player.x
    settings.map.y = settings.offsetPos.y - player.y
  }

  const resizeAndRepositionMap = () => {
    settings.map.el.classList.add('transition')
    clearTimeout(settings.transitionTimer)
    settings.transitionTimer = setTimeout(()=> {
      settings.map.el.classList.remove('transition')
    }, 500)
    updateOffset()
    positionMap()
    setPos(settings.map)
  }

  const stopSprite = actor => {
    actor.sprite.x = 0
    setBackgroundPos(actor.sprite)
    clearInterval(actor.walkingInterval)
  }

  const handleWalk = () =>{
    let dir = 'right'
    const { d } = settings

      player.walkingInterval = setInterval(()=>{
      if (Math.abs(player.y - settings.controlPos.y) > 20) {
        player.move.y = player.y > settings.controlPos.y ? -d : d
        dir = player.move.y === -d ? 'up' : 'down'
      } else {
        player.move.y = 0
      }
      if (Math.abs(player.x - settings.controlPos.x) > 20) {
        player.move.x = player.x > settings.controlPos.x ? -d : d
        dir = player.move.x === -d ? 'left' : 'right'
      } else {
        player.move.x = 0
      }

      player.move.x || player.move.y
        ? walk(player, dir)
        : stopSprite(player)
    }, 150)
  }

  player.x = 180
  player.y = 1630
  player.el.style.zIndex = player.y
  setSize(settings.map)

  document.addEventListener('click', e => {
    stopSprite(player)
    const { left, top } = settings.map.el.getBoundingClientRect()

    if (e.targetTouches) {
      settings.controlPos = { 
        x: e.targetTouches[0].offsetX - left,
        y: e.targetTouches[0].offsetY - top
      }
    } else {
      settings.controlPos = { 
        x: e.pageX - left,
        y: e.pageY - top
      }
    }

    handleWalk()
  })

  const addWall = ({x, y, width, height}) => {
    const wall = {
      id: `wall-${settings. elements.length + 1}`,
      x, y, el: Object.assign(document.createElement('div'), {
        className: 'wall',
      }),
      buffer: Math.max(width, height) / 2,
    }
    settings.elements.push(wall)
    settings.map.el.appendChild(wall.el)
    wall.el.style.zIndex = wall.y
    setPos(wall)
    setSize({el: wall.el, w: width, h: height})
  }

  //HORIZONTAIS

  //entrada safari zone
  for (let i = 0; i < 5; i++){
    addWall({x: 1840 + (i * 100), y: 440, width: 100, height: 40})
  }

  //lado direito da safari zone
  for (let i = 0; i < 17; i++){
    addWall({x: 160 + (i * 100), y: 380, width: 100, height: 40})
  }

  //lado esquerdo da safari zone
  for (let i = 0; i < 15; i++){
    addWall({x: 2340 + (i * 100), y: 380, width: 100, height: 40})
  }

  //lago cercado grande lapras
  for (let i = 0; i < 14; i++){
    addWall({x: 600 + (i * 100), y: 1870, width: 100, height: 40})
  }

  //primeira cerca esquerda
  for (let i = 0; i < 14; i++){
    addWall({x: 0 + (i * 100), y: 1440, width: 100, height: 40})
  }

  //primeira cerca direita
  for (let i = 0; i < 14; i++){
    addWall({x: 2680 + (i * 100), y: 1620, width: 100, height: 40})
  }

  //morro superior
  for (let i = 0; i < 20; i++){
    addWall({x: 400 + (i * 100), y: 2200, width: 100, height: 40})
  }

  // Lado superior cercado Pokémon duplo esquerdo
for (let i = 0; i < 12; i++){ 
  addWall({x: 420 + (i * 100), y: 540, width: 100, height: 40}) 
}
  ''
  // Lado inferior cercado Pokémon duplo esquerdo
  for (let i = 0; i < 12; i++){ 
    addWall({x: 420 + (i * 100), y: 860, width: 100, height: 40}) 
  }

  // Lado superior cercado Pokémon duplo direito
  for (let i = 0; i < 11; i++){ 
    addWall({x: 2580 + (i * 100), y: 540, width: 100, height: 40}) 
  }

  // Lado inferior cercado Pokémon duplo direito
  for (let i = 0; i < 11; i++){ 
    addWall({x: 2580 + (i * 100), y: 860, width: 100, height: 40}) 
  }

  // Lado superior da casa safari pequena
  for (let i = 0; i < 5; i++){ 
    addWall({x: 2160 + (i * 100), y: 1060, width: 100, height: 40}) 
  }

  // Lado inferior da casa safari pequena
  for (let i = 0; i < 5; i++){ 
    addWall({x: 2140 + (i * 100), y: 1380, width: 100, height: 40}) 
  }

  // Lado superior cercado Pokémon simples
  for (let i = 0; i < 7; i++){ 
    addWall({x: 2780 + (i * 100), y: 1060, width: 100, height: 40}) 
  }

  // Lado inferior cercado Pokémon simples
  for (let i = 0; i < 8; i++){ 
    addWall({x: 2740 + (i * 100), y: 1380, width: 100, height: 40}) 
  }

  //cerca superior da casa inferior
  for (let i = 0; i < 10; i++){
    addWall({x: 2580 + (i * 100), y: 1960, width: 100, height: 40})
  }

  // Casa dupla do correio
for (let i = 0; i < 9; i++){ 
  addWall({x: 2580 + (i * 100), y: 2620, width: 100, height: 40}) 
}

// Cerca esquerda na frente da casa dupla
for (let i = 0; i < 4; i++){ 
  addWall({x: 2580 + (i * 100), y: 2780, width: 100, height: 40}) 
}

// Cerca direita na frente da casa dupla
for (let i = 0; i < 3; i++){ 
  addWall({x: 3270 + (i * 100), y: 2780, width: 100, height: 40}) 
}

// Cerca inferior direita
for (let i = 0; i < 13; i++){ 
  addWall({x: 2460 + (i * 100), y: 3040, width: 100, height: 40}) 
}

for (let i = 0; i < 4; i++){ 
  addWall({x: 340 + (i * 100), y: 2960, width: 100, height: 40}) 
}

// Canto inferior esquerdo do morro
for (let i = 0; i < 7; i++){ 
  addWall({x: 1860 + (i * 100), y: 2960, width: 100, height: 40}) 
}

// Morro direito saída inferior
for (let i = 0; i < 6; i++){ 
  addWall({x: 1000 + (i * 100), y: 2960, width: 100, height: 40}) 
}

// Casas no morro
for (let i = 0; i < 20; i++){ 
  addWall({x: 400 + (i * 100), y: 2620, width: 100, height: 40}) 
}

// Entrada do ginásio
for (let i = 0; i < 7; i++){ 
  addWall({x: 400 + (i * 100), y: 2700, width: 100, height: 40}) 
}

// Árvores no canto inferior esquerdo
for (let i = 0; i < 9; i++){ 
  addWall({x: 180 + (i * 100), y: 3140, width: 100, height: 40}) 
}

// Pokémart superior
for (let i = 0; i < 3; i++){ 
  addWall({x: 760 + (i * 100), y: 1020, width: 100, height: 40}) 
}

// Pokémart inferior
for (let i = 0; i < 3; i++){ 
  addWall({x: 760 + (i * 100), y: 1280, width: 100, height: 40}) 
}

// Arbustos do lado do Pokémart
for (let i = 0; i < 6; i++){ 
  addWall({x: 1120 + (i * 100), y: 1100, width: 100, height: 40}) 
}

// Arbustos na frente da Safari Zone
for (let i = 0; i < 5; i++){ 
  addWall({x: 1940 + (i * 100), y: 860, width: 100, height: 40}) 
}

// Cerca esquerda da Safari Zone
for (let i = 0; i < 1; i++){ 
  addWall({x: 1760 + (i * 100), y: 600, width: 100, height: 40}) 
}

// Cerca direita da Safari Zone
for (let i = 0; i < 2; i++){ 
  addWall({x: 2180 + (i * 100), y: 600, width: 100, height: 40}) 
}

// Cerca esquerda da casa Safari
for (let i = 0; i < 1; i++){ 
  addWall({x: 2160 + (i * 100), y: 1540, width: 100, height: 40}) 
}

// Cerca direita da casa Safari
for (let i = 0; i < 2; i++){ 
  addWall({x: 2500 + (i * 100), y: 1540, width: 100, height: 40}) 
}

for (let i = 0; i < 9; i++){ 
  addWall({x: 1580 + (i * 100), y: 3320, width: 100, height: 40}) 
}

// Cerca inferior saída esquerda
for (let i = 0; i < 2; i++){ 
  addWall({x: 0 + (i * 100), y: 1800, width: 100, height: 40}) 
}

// Árvore inferior saída direita
for (let i = 0; i < 2; i++){ 
  addWall({x: 3840 + (i * 100), y: 1960, width: 100, height: 40}) 
}


  //VERTICAIS

  //primeira cerca dps da saida esquerda
  for (let i = 0; i < 4; i++){
    addWall({x: 600, y: 1460 + (i * 100), width: 40, height: 100})
  }
  //segunda cerca dps da saida esquerda
  for (let i = 0; i < 8; i++){
    addWall({x: 2140, y: 1080 + (i * 100), width: 40, height: 100})
  }

  //lateral do morro esquerda
  for (let i = 0; i < 8; i++){
    addWall({x: 360, y: 2200 + (i * 100), width: 40, height: 100})
  }

  //lateral do morro direita
  for (let i = 0; i < 8; i++){
    addWall({x: 2360, y: 2200 + (i * 100), width: 40, height: 100})
  }

  //arvores superior esquerda
  for (let i = 0; i < 10; i++){
    addWall({x: 140, y: 420 + (i * 100), width: 40, height: 100})
  }
  //arvores superior direita
  for (let i = 0; i < 12; i++){
    addWall({x: 3840, y: 420 + (i * 100), width: 40, height: 100})
  }

  //arvores inferior direita
  for (let i = 0; i < 14; i++){
    addWall({x: 160, y: 1780 + (i * 100), width: 40, height: 100})
  }
  //arbustos inferior direita
  for (let i = 0; i < 11; i++){
    addWall({x: 3780, y: 1960 + (i * 100), width: 40, height: 100})
  }

  //lateral direita do lago
  for (let i = 0; i < 4; i++){
    addWall({x: 1380, y: 1460 + (i * 100), width: 40, height: 100})
  }

  //lateral esquerda pedra esquerda saida inferior
  for (let i = 0; i < 4; i++){
    addWall({x: 1020, y: 2940 + (i * 100), width: 40, height: 100})
  }
  //lateral direita pedra esquerda saida inferior
  for (let i = 0; i < 4; i++){
    addWall({x: 1560, y: 2940 + (i * 100), width: 40, height: 100})
  }
  //lateral esquerda pedra direita saida inferior
  for (let i = 0; i < 4; i++){
    addWall({x: 2440, y: 2960 + (i * 100), width: 40, height: 100})
  }

  // Lateral esquerda cercado casa dupla
  for (let i = 0; i < 7; i++){ 
    addWall({x: 2580, y: 1960 + (i * 100), width: 40, height: 100}) 
  }

  // Lateral direita cercado casa dupla
  for (let i = 0; i < 5; i++){ 
    addWall({x: 3540, y: 2000 + (i * 100), width: 40, height: 100}) 
  }

  // Lateral direita casa dupla
  for (let i = 0; i < 2; i++){ 
    addWall({x: 3480, y: 2460 + (i * 100), width: 40, height: 100}) 
  }



  
// Saída esquerda
for (let i = 0; i < 4; i++){ 
  addWall({x: 0, y: 1420 + (i * 100), width: 40, height: 100}) 
}

// Saída direita
for (let i = 0; i < 4; i++){ 
  addWall({x: 4000, y: 1660 + (i * 100), width: 40, height: 100}) 
}

// Arbustos verticais na frente da Safari Zone
for (let i = 0; i < 2; i++){ 
  addWall({x: 1860, y: 940 + (i * 100), width: 40, height: 100}) 
}

// Lateral esquerda cercado duplo
for (let i = 0; i < 4; i++){ 
  addWall({x: 420, y: 540 + (i * 100), width: 40, height: 100}) 
}

// Lateral direita cercado duplo
for (let i = 0; i < 4; i++){ 
  addWall({x: 1520, y: 540 + (i * 100), width: 40, height: 100}) 
}

// Lateral direita Pokémart
for (let i = 0; i < 3; i++){ 
  addWall({x: 1040, y: 1020 + (i * 100), width: 40, height: 100}) 
}

// Lateral esquerda Pokémart
for (let i = 0; i < 3; i++){ 
  addWall({x: 760, y: 1020 + (i * 100), width: 40, height: 100}) 
}

// Lateral esquerda cercado Pokémon simples
for (let i = 0; i < 3; i++){ 
  addWall({x: 2760, y: 1100 + (i * 100), width: 40, height: 100}) 
}

// Lateral direita cercado Pokémon simples
for (let i = 0; i < 3; i++){ 
  addWall({x: 3440, y: 1100 + (i * 100), width: 40, height: 100}) 
}

// Lateral direita cercado Pokémon duplo direito
for (let i = 0; i < 3; i++){ 
  addWall({x: 3600, y: 580 + (i * 100), width: 40, height: 100}) 
}

// Lateral esquerda cercado Pokémon duplo direito
for (let i = 0; i < 3; i++){ 
  addWall({x: 2600, y: 580 + (i * 100), width: 40, height: 100}) 
}

// Lateral direita casa Safari
for (let i = 0; i < 3; i++){ 
  addWall({x: 2620, y: 1100 + (i * 100), width: 40, height: 100}) 
}

//Cercados pokemon verticais

// Cercado Omanyte esquerda
for (let i = 0; i < 3; i++){ 
  addWall({x: 500, y: 600 + (i * 100), width: 40, height: 100}) 
}

// Cercado Omanyte direita
for (let i = 0; i < 3; i++){ 
  addWall({x: 900, y: 600 + (i * 100), width: 40, height: 100}) 
}

// Cercado Cyndaquil esquerda
for (let i = 0; i < 3; i++){ 
  addWall({x: 1060, y: 600 + (i * 100), width: 40, height: 100}) 
}

// Cercado Cyndaquil direita
for (let i = 0; i < 3; i++){ 
  addWall({x: 1500, y: 600 + (i * 100), width: 40, height: 100}) 
}

// Cercado Nidoran esquerda
for (let i = 0; i < 3; i++){ 
  addWall({x: 2660, y: 600 + (i * 100), width: 40, height: 100}) 
}

// Cercado Nidoran direita
for (let i = 0; i < 3; i++){ 
  addWall({x: 2960, y: 600 + (i * 100), width: 40, height: 100}) 
}

// Cercado Psyduck esquerda
for (let i = 0; i < 3; i++){ 
  addWall({x: 3160, y: 600 + (i * 100), width: 40, height: 100}) 
}

// Cercado Psyduck direita
for (let i = 0; i < 3; i++){ 
  addWall({x: 3540, y: 600 + (i * 100), width: 40, height: 100}) 
}

// Parede snorlax
for (let i = 0; i < 3; i++){ 
  addWall({x: 3780, y: 1660 + (i * 100), width: 40, height: 100}) 
}

//Cercados pokemon horizontais

// Topo do cercado Omanyte
for (let i = 0; i < 4; i++){
  addWall({x: 520 + (i * 100), y: 640, width: 100, height: 40})
}

// Base do cercado Omanyte
for (let i = 0; i < 4; i++){
  addWall({x: 520 + (i * 100), y: 800, width: 100, height: 40})
}

// Topo do cercado Cyndaquill
for (let i = 0; i < 4; i++){
  addWall({x: 1100 + (i * 100), y: 620, width: 100, height: 40})
}

// Base do cercado Cyndaquill
for (let i = 0; i < 4; i++){
  addWall({x: 1100 + (i * 100), y: 820, width: 100, height: 40})
}

// Topo do cercado Nindoran
for (let i = 0; i < 4; i++){
  addWall({x: 2640 + (i * 100), y: 620, width: 100, height: 40})
}

// Base do cercado Nindoran
for (let i = 0; i < 4; i++){
  addWall({x: 2640 + (i * 100), y: 820, width: 100, height: 40})
}

// Topo do cercado Psyduck
for (let i = 0; i < 4; i++){
  addWall({x: 3180 + (i * 100), y: 620, width: 100, height: 40})
}

// Base do cercado Psyduck
for (let i = 0; i < 4; i++){
  addWall({x: 3180 + (i * 100), y: 820, width: 100, height: 40})
}

  function positionUpdate() {
    let positionUpdate = document.querySelector(".position-update");
    let xPosition = player.x;
    let yPosition = player.y;
    positionUpdate.innerHTML = 'X:' + xPosition + ' Y:' + yPosition;
  }

  setInterval(positionUpdate, 500)

  window.addEventListener('focus', ()=> settings.isWindowActive = true)
  window.addEventListener('blur', ()=> settings.isWindowActive = false)
  window.addEventListener('resize', ()=> {
    resizeAndRepositionMap()
  })
  resizeAndRepositionMap()

  pokedexDisplay = document.querySelector('.pokedexDisplay');
  
  pokedexDisplay.addEventListener('click', ()=>
      alert('aaaaa')
  )

  new Array(1).fill('').forEach(()=> addSnorlax())
  new Array(1).fill('').forEach(()=> addLapras())
  new Array(1).fill('').forEach(()=> addCyndaquill())
  new Array(1).fill('').forEach(()=> addNindoran())
  new Array(1).fill('').forEach(()=> addPsyduck())
  new Array(1).fill('').forEach(()=> addOmanyte())
}

window.addEventListener('DOMContentLoaded', init)