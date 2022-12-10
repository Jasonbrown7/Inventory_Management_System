<template>
  <div>
    <!-- Nav bar -->
    <nav class="d-flex navbar">
    <a class="me-auto ps-3 py-0 my-0 navbar-brand" href="/"> <img src="./assets/logo.png" alt="Bently Nevada" width="100" height="40"></a>
    <router-link class="navbar-nav mx-4" to="/browse"> Browse </router-link> | 
    <router-link class="navbar-nav mx-4" to="/reservations"> Reservations </router-link> | 
    <router-link class="navbar-nav mx-4" to="/profile"> Profile </router-link> |
    <router-link class="navbar-nav mx-4" to="/login"> Login </router-link> |
    <router-link class="navbar-nav mx-4" to="/view/users"> View Users </router-link> | 
    <router-link class="navbar-nav mx-4" to="/create/users"> Create Users </router-link> |
    <router-link class="navbar-nav mx-4" to="/view/items"> View Items </router-link> | 
    <router-link class="navbar-nav mx-4" to="/create/items"> Create Items </router-link>
    </nav>

    <!-- Router view -->
      <router-view></router-view>
  </div>
</template>
