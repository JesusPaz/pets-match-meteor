<template>
  <v-app id="vue-app-color">
    <div class="form-wrapper" id="Login">
      <v-form v-model="valid">
        <v-text-field label="User" v-model="user" :rules="userRules"></v-text-field>
        <v-text-field :type="'password'" label="Password" v-model="password" :rules="passwordRules"></v-text-field>
        <v-btn @click="submit" :disabled="!valid">Login</v-btn>
      </v-form>
      <br />
      <br />
      <br />
      <br />
      <br />
      <p>You are not logged in?</p>
      <br />
      <router-link to="signup">Sign up</router-link>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      user: "",
      password: "",
      valid: false,
      userRules: [
        user => !!user || "User is required",
        user =>
          /^([a-zA-Z0-9_\.\-]){4,14})+$/.test(
            user
          ) || "User must be valid and a size between 4 and 14 characters "
      ],
      passwordRules: [
        password => !!password || "Password is required",
        password =>
          /^([a-zA-Z0-9]{6,14})+$/.test(password) ||
          "The password must have uppercase and a size between 6 and 14 characters"
      ]
    };
  },
  methods: {
    submit() {
      if (this.user == this.password) {
        localStorage.setItem("user", this.user);
        this.$emit("validUser", true);
        this.$router.push({ path: "users" });
      } else {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      }
    }
  }
};
</script>

<style>
.form-wrapper {
  padding: 40px;
  text-align: center;
}

#Login {
  padding: 15% 25% 25% 25%;
  block-size: 100px;
}

#vue-app-color {
  background-color: white;
}
</style>