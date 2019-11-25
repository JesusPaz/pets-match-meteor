<template>
  <v-app id="vue-app-color">

    <v-content class="back-img">
    <div id="Signup">
      <p>Please fill in the following fields</p>
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
        <v-btn @click="submit" :disabled="!valid" style="margin-top:2%">Sign up</v-btn>
      </v-form>
      <p style="margin-top:5%">
        Go back to
        <router-link to="/home">Login</router-link>
      </p>
    </div>
    </v-content>
  </v-app>
</template>

<script>
const axios = require("axios");
// Production
const url = "https://pets-match.herokuapp.com"
// Development
// const url = "http://localhost:3000"

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
          .post(url+"/api/singup", {
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
  padding: 2% 60% 10% 5%;

}

#vue-app-color {
  background-color: white;
}

.back-img {
  width: 100%;
  background-image: url("https://img.wallpapersafari.com/desktop/1920/1080/98/26/K2DkFs.png");
  /* Full height */
  height: 100%;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>