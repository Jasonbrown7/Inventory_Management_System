<template>
  <div>
    <!-- Nav bar -->
    <nav class="d-flex navbar">
    <a class="me-auto ps-3 py-0 my-0 navbar-brand" href="/"> <img src="./assets/logo.png" alt="Bently Nevada" width="100" height="40"></a>
    <router-link class="navbar-nav mx-4" to="/browse"> Browse </router-link> | 
    <router-link class="navbar-nav mx-4" to="/reservations"> Reservations </router-link> | 
    <router-link class="navbar-nav mx-4" to="/profile"> Profile </router-link> |
    <router-link class="navbar-nav mx-4" to="/login"> Login </router-link> |
    <router-link class="navbar-nav mx-4" to="/items"> Items - Admin</router-link> |
    <router-link class="navbar-nav mx-4" to="/users"> Users - Admin</router-link>
    </nav>

    <!-- Router view -->
      <router-view></router-view>
  </div>
</template>
