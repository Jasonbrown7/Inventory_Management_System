<template>
    <body>
        <div class="d-flex flex-column align-items-center justify-content-center container-fluid">
          </div>
        
            <section class="greenbanner">
                <div class = "justify-content-left">
                    <h1 style = 'display: inline-block; border: 1px black solid'> Search for Item: </h1>
                </div>
            </section>
        
            <!-- <section class = "filters">
                <h1 style = ''> Search Results. </h1> 
                </section> -->
            
            <section class = "itembox">
                <img src = "../assets/sled3.jpg" alt = "sled" class = "itemimage">
                    <h1 class = "itemName"> Winter Sled
                    </h1>
                </section>
            <section class = "itembox2">
                <img src = "../assets/skiis.jpg" alt = "skiis" class = "itemimage">
                    <h1 class = "itemName"> Skiis
                    </h1>
                </section>
            <section class = "itembox3">
                <img src = "../assets/skiipoles.png" alt = "skiipoles" class = "itemimage">
                    <h1 class = "itemName"> Skii Poles
                    </h1>
                </section>
            


           
            
        
           
    
    </body>
</template>

  
<style>
.itemimage {
    display: flex;
    position: absolute;
    width: 300px;
    height: 196px;
}

.itemName {
    position: absolute;
    font-size: 30px;
    font-weight: 150px;
    color:rgb(0, 0, 0);
    left: 310px;
 
    
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
