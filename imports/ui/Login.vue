<template>
  <v-app>
    <v-content class="back-img-log">
      <v-row no-gutters>
        <v-col m="6">
          <v-card class="mx-auto" max-width="344" style="margin-top:20%; margin-left:10%;">
            <v-card-text>
              <p class="display-1 text--primary">Welcome to PetsMatch</p>

              <div class="text--primary">
                This is the place where your pet can make friends and have
                a great time. Who knows, maybe you'll meet new people, too.
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col m="6">
          <div class="form-wrapper" id="Login">
            <v-form v-model="valid" style="margin-top:10%">
              <v-text-field label="User" v-model="user" :rules="userRules"></v-text-field>
              <v-text-field
                :type="'password'"
                label="Password"
                v-model="password"
                :rules="passwordRules"
              ></v-text-field>
              <v-btn @click="submit" :disabled="!valid">Login</v-btn>
            </v-form>
            <br />
            <br />
            <p>You are not logged in?</p>

            <router-link to="signup">Sign up</router-link>
          </div>
        </v-col>
      </v-row>
    </v-content>
  </v-app>
</template>

<script>
const axios = require("axios");
// Production
//const url = "https://pets-match.herokuapp.com"
// Development
const url = "http://localhost:3000"

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
          /^([a-zA-Z0-9_\.\-]{4,14})+$/.test(user) ||
          "User must be valid and a size between 4 and 14 characters "
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
      axios
        .post(url+"/api/login", {
          user: this.user,
          password: this.password
        })
        .then(response => {
          if (response.status == 200) {
            localStorage.setItem("user", this.user);
            this.$emit("validUser", true);
            this.$router.push({ path: "home" });
          }
          console.log(response.status);
        })
        .catch(error => {
          if (error.response.status == 401) {
            alert(error.response.data.message);
          } else {
            alert("Unexpected error, please contact the admin");
          }
        });
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
  background-color: red;
}

.back-img-log {
  width: 100%;
  background-image: url("https://img.wallpapersafari.com/desktop/1920/1080/75/39/qdC5mc.png");
  /* Full height */
  height: 100%;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>