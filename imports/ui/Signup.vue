<template>
  <v-app id="vue-app-color">
    <div id="Signup">
      <v-form v-model="valid">
        <v-text-field label="User" v-model="user" :rules="userRules"></v-text-field>
        <v-text-field label="Email" v-model="email" :rules="emailRules"></v-text-field>
        <v-text-field
          label="Type password"
          :type="'password'"
          v-model="password"
          :rules="passwordRules"
        ></v-text-field>
        <v-text-field
          label="Write again your password"
          :type="'password'"
          v-model="reenterpassword"
          :rules="passwordRules"
        ></v-text-field>
        <v-btn @click="submit" :disabled="!valid">Sign up</v-btn>
      </v-form>
      <p style="margin-top:5%">
        Go back to
        <router-link to="/home">Login</router-link>
      </p>
    </div>
  </v-app>
</template>

<script>
const axios = require("axios");

export default {
  name: "Signup",

  data() {
    return {
      user: "",
      email: "",
      password: "",
      reenterpassword: "",
      valid: false,
      userRules: [
        user => !!user || "User is required",
        user =>
          /^([a-zA-Z0-9_\.\-]{4,14})+$/.test(user) ||
          "User must be valid and a size between 4 and 14 characters "
      ],
      emailRules: [
        email => !!email || "Email is required",
        email =>
          /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
            email
          ) || "Email must be valid"
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
      if (this.password == this.reenterpassword) {
        axios
          .post("http://localhost:3000/api/singup", {
            user: this.user,
            email: this.email,
            password: this.password
          })
          .then(response => {
            if (response.status == 200) {
              localStorage.setItem("user", this.email);
              this.$emit("validUser", true);
              this.$router.push({ path: "home" });
            }
          })
          .catch(error => {
            if (error.response.status == 401) {
              alert(error.response.data.message);
            } else {
              alert("Unexpected error, please contact the admin");
            }
          });
      } else {
        alert("The passwords does not match");
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

#Signup {
  padding: 2% 25% 25% 25%;
  block-size: 100px;
}

#vue-app-color {
  background-color: white;
}
</style>