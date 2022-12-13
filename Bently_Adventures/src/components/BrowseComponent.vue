<template>
    <body>

        <div class="d-flex flex-column align-items-center justify-content-center container-fluid">
          </div>
        
            <section class="greenbanner">
                <div class = "justify-content-left my-3 mx-4">
                    <h1 style = 'background: white; padding: 10px 80px 10px 10px; display: inline-block; border: 1px black solid'> Search for Item: </h1>
                </div>
            </section>
        
            <!-- <section class = "filters">
                <h1 style = ''> Search Results. </h1> 
                </section> -->
            <div style = 'background: grey'>
            <section class = "itembox d-flex flex-row">
                    <img src = "../assets/sled3.jpg" id="sled" onclick="displaySled()" alt = "sled" class = "itemimage">
                
                    <h1 class = "itemName"> Winter Sled
                        <h2 class = "itemCondition"> Condition: Like-New <!-- Put vars in here or condition status -->
                            <h3 class = "itemAvailability"> Available
                                </h3>
                            </h2>
                        </h1>
                        
                    
                </section>
            <section class = "itembox2">
                <img src = "../assets/skiis.jpg" alt = "skiis" class = "itemimage">
                    <h1 class = "itemName"> Skiis
                        <h2 class = "itemCondition"> Condition: Damaged <!-- Put vars in here or condition status -->
                            <h3 class = "itemAvailability"> Available
                                </h3>
                            </h2>
                    </h1>
                </section>
            <section class = "itembox3">
                <img src = "../assets/skiipoles.png" alt = "skiipoles" class = "itemimage">
                    <h1 class = "itemName"> Skii Poles
                        <h2 class = "itemCondition"> Condition: Like-New <!-- Put vars in here or condition status -->
                            <h3 class = "itemAvailability"> Available
                                </h3>
                            </h2>
                    </h1>
            
                </section>
            <section class = "itemboxselected d-flex d-flex-row">
                <img src = "../assets/sled3.jpg" alt = "sled" class = "itemimageselected">
                <h1 class = "itemnameselected"> Winter Sled
                        <h2 class = "itemCondition"> Condition: Like-New <!-- Put vars in here or condition status -->
                            <h3 class = "itemAvailability"> Available
                                <h4 class = "itemreviewstitle"> Reviews: </h4>
                                    <p class = itemreviews>-Scuffed on the edges, functions as new. <br>-Rented this many times, always a blast.</p>
                                </h3>
                            </h2>
                        </h1>
            </section>
            </div>

            <div>
                <h1> TEST </h1>
                </div>

            


           
            
        
           
    
    </body>
</template>

<!-- <script>

function displaySled() {
    
    var x = document.getElementById("sled");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}


</script> -->

<style>
.itemimage {
    display: flex;
    position: absolute;
    width: 300px;
    height: 196px;
}

.itemName {
    font-size: 30px;
    font-weight: 150px;
    color:rgb(0, 0, 0);
    margin-left: 310px;
}

.itemCondition {
    font-size: 20px;
    font-weight: 50px;
    color:black;
}

.itemreviewstitle {
    font-size: 30px;
    font-weight: 50px;
    color:black;
    margin-top: 35px;
}

.itemreviews {
    font-size: 20px;
    font-weight: 50px;
    color:black;
}


.itemAvailability {
    font-size: 20px;
    font-weight: 50px;
    color: green;
}

.itembox {
    position: absolute;
    border: 2px black solid;
    width: 600px;
    height: 200px;
    left: 20px;
    top:140px;
}

.itembox2 {
    position: absolute;
    border: 2px black solid;
    width: 600px;
    height: 200px;
    left: 20px;
    top:350px;
    display: flex;

}

.itembox3 {
    position: absolute;
    border: 2px black solid;
    width: 600px;
    height: 200px;
    left: 20px;
    top:560px;
    display: flex;

}

.itemboxselected {
    position: absolute;
    border: 2px black solid;
    width: 500px;
    height: 620px;
    left: 700px;
    top: 140px;
}

.itemimageselected {
    display: flex;
    position: absolute;
    width: 496px;
    height: 350px;
}

.itemnameselected {
    font-size: 30px;
    font-weight: 150px;
    color:rgb(0, 0, 0);
    margin-left: 10px;
    margin-top: 350px;
}

.heroimage {
    display: flex;
    width:100vw;
    height: calc(100vh - 56px);
    background: url("../assets/hero.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size:cover;
    background-attachment: fixed;
}
.greenbanner {
    background: url("../assets/green.png");
    position: absolute;
    width: 1440px;
    height: 64px;
}

.filters {
    position: absolute;
    width: 421px;
    height: 31px;
    left: 38px;
    top: 260px;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 26px;
    line-height: 31px;
}

.greenbanner h1 {
    font-size: 15px;
    font-weight: 350;
    color:rgb(0, 0, 0);
    bottom: 0;
    left: 0;
    
}

</style>
