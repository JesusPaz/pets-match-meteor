<template>
  <div id="Home">
    <v-bottom-navigation v-model="bottomNav">
      <v-btn value="recent" to="/dependencies">
        <span>Dependencies</span>
      </v-btn>

      <v-btn value="favorites" to="/users">
        <span>Users</span>
      </v-btn>
      <v-btn value="favorites" to="/" v-on:click.native="logout()" replace>
        <span>Log Out</span>
      </v-btn>
    </v-bottom-navigation>
    <router-view></router-view>
  </div>
</template>

<script>
import Users from "./Users.vue";

export default {
  name: "Home",

  components: {
    Users
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

      // var errorMessage = error.message;
      // alert(errorMessage);
    }
  }
};
</script>
<style>
#Home {
  padding: 5% 25% 25% 25%;
  block-size: 100px;
}
</style>