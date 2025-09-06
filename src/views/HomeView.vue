<script setup lang="ts">

</script>

<template>
  <div class="main-content" id="home">

    <!-- <div class="background-home"><img src="/img/home-background.jpg" class="" alt="background-home"></div> -->
    
    <div class="text-home position-absolute z-10 top-0">
      <h1 class="font-82 MuseoSemiBold">{{$t("Home.Welcome")}}</h1>
      <div class="pagraph-home font-20 RalewayRegular">
        <span>{{$t("Home.Text1")}}</span>
        <span>{{$t("Home.Text2")}}</span>
        <span>{{$t("Home.Text3")}}</span>
        <span>{{$t("Home.Text4")}}</span> 
      </div>
    </div>
  </div>
</template>

<style scoped>

#home {
  overflow: hidden !important;
  margin: 0 !important;
  padding: 0 !important;
  position: relative;
  height: 100vh;
}

.background-home {
  position: absolute;
  z-index: 0;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.background-home img {
  object-fit: cover;
  /* object-position: top; */
  height: 100%;
  width: 100%;
}


  /* #home{
    margin: 0 !important;
    background-image: url('/img/home-background.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top;
    width: 100% !important;
    max-width: 100% !important;
    height: 100vh; 
  } */

  
#home::before {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-image: url('/img/home-background.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    opacity: 0.3; 
    z-index: 1;
    pointer-events: none; 
}

  #home > * {
      position: relative;
      z-index: 2;
  }
  .text-home{
    color: var(--blackBlue);
    padding: 3.96rem;
  }

  .text-home h1{
    font-size: 5.16em;
    font-weight: 700;
  }

  .pagraph-home{
    font-size: 1.26em;
    font-weight: 300;
    /* line-height: 0.5rem; */
    margin-top: 2.58rem;
    text-shadow: 0.2px 0px 0px;
  }
</style>
