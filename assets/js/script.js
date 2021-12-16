let inputhero = document.querySelector("#input");

$("#formulario").on("submit", function(ev){
    
    ev.preventDefault();

    let idhero = inputhero.value

    $("#resultado").css("display","block");

    $.get(`https://www.superheroapi.com/api.php/4773825629344394/${idhero}`, function(hero){
        //aquí va la información de la card
        $(".imagenhero").attr("src",`${hero.image.url}`);
        $("#nombre").html(`Nombre: ${hero.name}`);
        $("#conexiones").html(`Conexiones: ${hero.connections['group-affiliation']}`);
        $("#publicado").html(`Publicado por: ${hero.biography.publisher}`);
        $("#ocupacion").html(`Ocupación: ${hero.work.occupation}`);
        $("#primeraAp").html(`Primera Aparición: ${hero.biography['first-appearance']}`);
        $("#altura").html(`Altura: ${hero.appearance.height[0]}-${hero.appearance.height[1]}`);
        $("#peso").html(`Peso: ${hero.appearance.weight[0]}-${hero.appearance.weight[1]}`);
        $("#apodos").html(`Apodos: ${hero.biography.aliases}`);

        function grafico(hero) {
            var chart = new CanvasJS.Chart("chartContainer", {
                animationEnabled: true,
                title: {
                    text: `Estadísticas de Poder para ${hero.name}`
                },
                data: [{
                    type: "pie",
                    startAngle: 240,
                    yValueFormatString: "##0",
                    indexLabel: "{label} {y}",
                    dataPoints: [
                        {y: `${hero.powerstats.power}`, label: "Power"},
                        {y: `${hero.powerstats.combat}`, label: "Combat"},
                        {y: `${hero.powerstats.intelligence}`, label: "Intelligence"},
                        {y: `${hero.powerstats.strength}`, label: "Strength"},
                        {y: `${hero.powerstats.speed}`, label: "Speed"},
                        {y: `${hero.powerstats.durability}`, label: "Durability"}
                    ]
                }]
            });
            chart.render();
            
        };
            
        grafico(hero);
    });
});

