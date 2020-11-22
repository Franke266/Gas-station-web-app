    var aLogin=[];
    function Login(){
    var useremail=document.getElementById("username").value;
    var userpassword=document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(useremail, userpassword).catch(function(error){
        var errorCode=error.code;
        var errorMessage=error.message;
        window.alert("Unijeli ste pogrešnu email adresu ili lozinku!!!");
        //console.log("Error: " + errorMessage);
    });

  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
   window.location.href="Benzinska_crpka.html";
  } else {
    // No user is signed in.
    
  }
});
}
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var user = firebase.auth().currentUser;
var uid;
if (user != null) {
  uid = user.uid;  
}
aLogin.push({
    Uid:user.uid

});
  } else {
    // No user is signed in.
    
  }
});

function Logout(){
    firebase.auth().signOut();
}


    var oDb = firebase.database();
    var oDbSpremnici= oDb.ref('Spremnik');
    var aSpremnici=[];
    oDbSpremnici.on('value', function(oOdgovorPosluzitelja)
    {
    aSpremnici=[];
    oOdgovorPosluzitelja.forEach(function (oSpremniciSnapshot)
    {
        var oSpremnici = oSpremniciSnapshot.val();
        aSpremnici.push({
            Spremnik : oSpremnici.Id_spremnika,
            VrstaGoriva: oSpremnici.Naziv,
            Stanje: oSpremnici.Stanje
            
        });
    });
    var Diesel_spremnik=0;
    var Benzin_spremnik=0;
    var Plin_spremnik=0;
    aSpremnici.forEach(function (oSpremnik){
    if(oSpremnik.Spremnik==1)
    {
        Diesel_spremnik=parseInt(oSpremnik.Stanje);
    }
    
    else if(oSpremnik.Spremnik==2)
    {
        Benzin_spremnik=parseInt(oSpremnik.Stanje);
    }
    else
    {
        Plin_spremnik=parseInt(oSpremnik.Stanje);
    }

    });
    var data = [
  {
    domain: { row: 0, column: 0 },
    value: Diesel_spremnik,
    title: { text: "Diesel" },
    type: "indicator",
    mode: "gauge+number",
    delta: { reference: 400 },
    gauge: { axis: { range: [1000, 20000] } }
  },

  {
    domain: { row: 0, column: 1 },
    value: Benzin_spremnik,
    title: { text: "Benzin" },
    type: "indicator",
    mode: "gauge+number",
    delta: { reference: 400 },
    gauge: { axis: { range: [1000, 20000] } }
  },

  
  {
    domain: { row: 0, column: 2 },
    value: Plin_spremnik,
    title: { text: "Plin" },
    type: "indicator",
    mode: "gauge+number",
    delta: { reference: 400 },
    gauge: { axis: { range: [1000, 20000] } }
  }
  ];


var layout = { 
        width: 1000,
        height: 300,
        margin: { t: 25, b: 25, l: 25, r: 25 },
        grid: { rows: 1, columns: 3, pattern: "independent" },
        };

Plotly.newPlot('myDiv2', data, layout, {displaylogo: false, modeBarButtonsToRemove: ['toImage'], responsive: true});
});

    var aZaposlenici=[];
    var oDb = firebase.database();
    var oDbZaposlenici= oDb.ref('Zaposlenik');
    oDbZaposlenici.on('value', function(oOdgovorPosluzitelja)
    {
    aZaposlenici=[];
    oOdgovorPosluzitelja.forEach(function (oZaposleniciSnapshot)
    {
        var oZaposlenici = oZaposleniciSnapshot.val();
        aZaposlenici.push({
            Ime_prezime: oZaposlenici.Ime_prezime,
            Email: oZaposlenici.Email,
            Lozinka : oZaposlenici.Lozinka,
            Id_zap: oZaposlenici.Id_zaposlenika
        });
    });
});

function PopuniTablicuRacuni(){

aRacuni.forEach(function (oRacuni){
            var VrstaGor="";
            if(oRacuni.VrstaGoriva == 1)
            {
                VrstaGor = "Diesel";
            }
            else if(oRacuni.VrstaGoriva == 2)
            {
                VrstaGor = "Benzin";
            }
            else
            {
                VrstaGor = "Plin";
            }
        $("#table_body").append("<tr><td>" + oRacuni.Kolicina + " " + "l" + "</td><td>" + VrstaGor + "</td><td>" + oRacuni.DatumVrijeme + "</td><td>" + oRacuni.Zaposlenik + "</td><td>" + oRacuni.Cijena + " " + "kn" + "</td></tr>");
        $(document).ready( function () {
    $('#TablicaRacuni').DataTable();
} );
    });
}

function AzurirajDiesel(){
    const fb=firebase.database().ref()
    var Novo_stanje=document.getElementById("azuriraj_spremnik1").value
    aSpremnik_diesel.forEach(function (oSpremnikdiesel){
    var Stanje=+oSpremnikdiesel.Stanje + +Novo_stanje;
    if(Novo_stanje<700)
    {
        window.alert("Minimalna količina je 700 litara!!!")
    }
    else if(Stanje>20000)
    {
        window.alert("Maksimalni kapacitet spremnika je 20000 litara!!!")
    }
    else
    {
        data={Stanje}
        fb.child("Spremnik/0").update(data)
        window.location.reload()
    }
});

}

function AzurirajBenzin(){
    const fb=firebase.database().ref()
    var Novo_stanje=document.getElementById("azuriraj_spremnik2").value
    aSpremnik_benzin.forEach(function (oSpremnikbenzin){
    var Stanje=+oSpremnikbenzin.Stanje + +Novo_stanje;
    if(Novo_stanje<700)
    {
        window.alert("Minimalna količina je 700 litara!!!")
    }
    else if(Stanje>20000)
    {
        window.alert("Maksimalni kapacitet spremnika je 20000 litara!!!")
    }
    else
    {
        data={Stanje}
        fb.child("Spremnik/1").update(data)
        window.location.reload()
    }
});
}

function AzurirajPlin(){
    const fb=firebase.database().ref()
    var Novo_stanje=document.getElementById("azuriraj_spremnik3").value
    aSpremnik_plin.forEach(function (oSpremnikplin){
    var Stanje=+oSpremnikplin.Stanje + +Novo_stanje;
    if(Novo_stanje<700)
    {
        window.alert("Minimalna količina je 700 litara!!!")
    }
    else if(Stanje>20000)
    {
        window.alert("Maksimalni kapacitet spremnika je 20000 litara!!!")
    }
    else
    {
        data={Stanje}
        fb.child("Spremnik/2").update(data)
        window.location.reload()
    }
});
}

function IzdajRacun(){
    var provjera = false;
    var sZaposlenik;
    //var nKolicina_goriva = $('#Amount').val();
    var nKolicina_goriva = document.getElementById('Amount').value;
    var sVrsta_goriva_diesel = document.getElementById('diesel');
    var sVrsta_goriva_benzin = document.getElementById('benzin');
    var sVrsta_goriva_plin = document.getElementById('plin');
    var currentdate = new Date(); 
    var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " " 
                + currentdate.getHours() + ":"   
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    var nId_goriva=0;
    var sCijena=0;
    var fCijena=0;
    if(nKolicina_goriva<5)
    {
        window.alert("Minimalna količina je 5 litara!!!");
        provjera=true;
    }
    else
    {
    if(sVrsta_goriva_diesel.checked)
    {
        aSpremnik_diesel.forEach(function (oSpremnikdiesel){
            if(nKolicina_goriva>oSpremnikdiesel.Stanje)
            {
                window.alert("Nedovoljna količina goriva u spremniku!!!");
                provjera=true;
            }
            else
            {  
                var Stanje= +oSpremnikdiesel.Stanje - +nKolicina_goriva;
                const fb=firebase.database().ref()
                data={Stanje}
                fb.child("Spremnik/0").update(data)
                sCijena=(nKolicina_goriva*8.78);
                fCijena = sCijena.toFixed(2);
                nId_goriva=1;
            }
        });     
    }
   else if(sVrsta_goriva_benzin.checked)
    {
        aSpremnik_benzin.forEach(function (oSpremnikbenzin){
             if(nKolicina_goriva>oSpremnikbenzin.Stanje)
            {
                window.alert("Nedovoljna količina goriva u spremniku!!!");
                provjera=true;
            }
            else
            {
        var Stanje= +oSpremnikbenzin.Stanje - +nKolicina_goriva;
        const fb=firebase.database().ref()
         data={Stanje}
        fb.child("Spremnik/1").update(data)
        sCijena=(nKolicina_goriva*9.65);
        fCijena = sCijena.toFixed(2);
        nId_goriva=2;
        }
        });

    }
    else if(sVrsta_goriva_plin.checked)
    {
        aSpremnik_plin.forEach(function (oSpremnikplin){
             if(nKolicina_goriva>oSpremnikplin.Stanje)
            {
                window.alert("Nedovoljna količina goriva u spremniku!!!");
                provjera=true;
            }
            else
            {
        var Stanje= +oSpremnikplin.Stanje - +nKolicina_goriva;
        const fb=firebase.database().ref()
         data={Stanje}
        fb.child("Spremnik/2").update(data)
        sCijena=(nKolicina_goriva*4.60);
        fCijena = sCijena.toFixed(2);
        nId_goriva=3;
        }

    });
    }
    else
    {
        window.alert("Niste odabrali vrstu goriva!!!");
        provjera=true;
    }
    }
    if(provjera==false)
    {
    var sKey = firebase.database().ref().child('Racun').push().key;
    aLogin.forEach(function(oLogin){
        aZaposlenici.forEach(function(oZaposlenici){
            if(oLogin.Uid==oZaposlenici.Id_zap)
            {
                 sZaposlenik=oZaposlenici.Ime_prezime;
            }
        });
        
    });
    var oRacun = 
    {

        Cijena : fCijena,
        Datumvrijeme : datetime,
        Id_goriva: nId_goriva,
        Kolicina: nKolicina_goriva,
        Zaposlenik_izdao: sZaposlenik
    };

    // Zapiši u Firebase
    var oZapis = {};
    oZapis[sKey] = oRacun;
    oDbRacuni.update(oZapis);
    location.reload();
    }
}



    var aStatistika=[];
    var oDb = firebase.database();
    var oDbStatistika= oDb.ref('Racun');
    oDbStatistika.on('value', function(oOdgovorPosluzitelja)
    {
    aStatistika=[];
    oOdgovorPosluzitelja.forEach(function (oStatistikaSnapshot)
    {
        var oStatistika = oStatistikaSnapshot.val();
        aStatistika.push({
            VrstaGoriva: oStatistika.Id_goriva,
            Kolicina : oStatistika.Kolicina
        });
    });

        var Diesel=0;
        var Benzin=0;
        var Plin=0;
    aStatistika.forEach(function (oStat){
    if(oStat.VrstaGoriva==1)
    {
        Diesel+=parseInt(oStat.Kolicina);
    }
    
    else if(oStat.VrstaGoriva==2)
    {
        Benzin+=parseInt(oStat.Kolicina);
    }
    else
    {
        Plin+=parseInt(oStat.Kolicina); 
    }

    });
    var data = [{
  values: [Diesel, Benzin, Plin],
  labels: ['Diesel', 'Benzin', 'Plin'],
  type: 'pie'
}];

var layout = {
  height: 500,
  width: 600,
margin:{b:10}
};

Plotly.newPlot('myDiv', data, layout, {responsive: true});

}); 

    var aRacuni=[];
    var oDb = firebase.database();
    var oDbRacuni= oDb.ref('Racun');
    oDbRacuni.on('value', function(oOdgovorPosluzitelja)
    {
    aRacuni=[];
    oOdgovorPosluzitelja.forEach(function (oRacuniSnapshot)
    {
        var oRacuni = oRacuniSnapshot.val();
        aRacuni.push({
            DatumVrijeme: oRacuni.Datumvrijeme,
            Zaposlenik: oRacuni.Zaposlenik_izdao,
            Kolicina : oRacuni.Kolicina,
            VrstaGoriva: oRacuni.Id_goriva,
            Cijena: oRacuni.Cijena
            
        });
    });
    PopuniTablicuRacuni();
});

    var aSpremnik_diesel=[];
    var oDb = firebase.database();
    var oDbSpremnik_diesel= oDb.ref('Spremnik').orderByChild('Naziv').equalTo('Diesel');
    oDbSpremnik_diesel.on('value', function(oOdgovorPosluzitelja)
    {
    aSpremnik_diesel=[];
    oOdgovorPosluzitelja.forEach(function (oSpremnik_dieselSnapshot)
    {
        var oSpremnik_diesel = oSpremnik_dieselSnapshot.val();
        aSpremnik_diesel.push({
            Stanje: oSpremnik_diesel.Stanje
            
        });
    });
     PopuniTablicuDiesel();
});

    var aSpremnik_benzin=[];
    var oDb = firebase.database();
    var oDbSpremnik_benzin= oDb.ref('Spremnik').orderByChild('Naziv').equalTo('Benzin');
    oDbSpremnik_benzin.on('value', function(oOdgovorPosluzitelja)
    {
    aSpremnik_benzin=[];
    oOdgovorPosluzitelja.forEach(function (oSpremnik_benzinSnapshot)
    {
        var oSpremnik_benzin = oSpremnik_benzinSnapshot.val();
        aSpremnik_benzin.push({
            Stanje: oSpremnik_benzin.Stanje
            
        });
    });
    PopuniTablicuBenzin();
});


    var aSpremnik_plin=[];
    var oDb = firebase.database();
    var oDbSpremnik_plin= oDb.ref('Spremnik').orderByChild('Naziv').equalTo('Plin');
    oDbSpremnik_plin.on('value', function(oOdgovorPosluzitelja)
    {
    aSpremnik_plin=[];
    oOdgovorPosluzitelja.forEach(function (oSpremnik_plinSnapshot)
    {
        var oSpremnik_plin = oSpremnik_plinSnapshot.val();
        aSpremnik_plin.push({
            Stanje: oSpremnik_plin.Stanje
            
        });
    });
    PopuniTablicuPlin();
});

function PopuniTablicuDiesel(){

        aSpremnik_diesel.forEach(function(oSpremnik_diesel){

            $("#stanje_spremnika_diesel").append("<td>" + oSpremnik_diesel.Stanje + "</td>");
            
        });
         
}

function PopuniTablicuBenzin(){

        aSpremnik_benzin.forEach(function(oSpremnik_benzin){

            $("#stanje_spremnika_benzin").append("<td>" + oSpremnik_benzin.Stanje + "</td>");
            
        });
         
}

function PopuniTablicuPlin(){

        aSpremnik_plin.forEach(function(oSpremnik_plin){

            $("#stanje_spremnika_plin").append("<td>" + oSpremnik_plin.Stanje + "</td>");
            
        });
         
}

$(document).ready(function() { 
                $('input[type="radio"]').click(function() { 
                    var inputValue = $(this).attr("value"); 
                    var targetBox = $("." + inputValue); 
                    $(".selectt").not(targetBox).hide(); 
                    $(targetBox).show(); 
                }); 
            }); 

console.log(aLogin);