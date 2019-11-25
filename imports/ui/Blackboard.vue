<template>
  <v-app id="vue-app-color">
    <div id="Blackboard">
      <v-bottom-navigation v-model="bottomNav">
        <v-btn value="recent" to="/home">
          <span>Home</span>
        </v-btn>

        <v-btn value="favorites" to="/lovers">
          <span>Lovers</span>
        </v-btn>

        <v-btn value="favorites" to="/mypets">
          <span>My Pets</span>
        </v-btn>

        <v-btn value="favorites" to="/" v-on:click.native="logout()" replace>
          <span>Log Out</span>
        </v-btn>
      </v-bottom-navigation>
      <router-view></router-view>
    </div>
  </v-app>
</template>

<script>
import Home from "./Home.vue";
import MyPets from "./MyPets.vue";
import Lovers from "./Lovers.vue";

export default {
  name: "Blackboard",

  components: {
    Home,
    MyPets,
    Lovers
  },
  data() {
    return {
      bottomNav: "recent"
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("user");
      this.$emit("validUser", false);
      this.$router.push({ path: "login" });
    }
  }
};
</script>
<style>
#Blackboard {
  padding: 1% 25% 1% 25%;
  block-size: 100px;
}

</style>