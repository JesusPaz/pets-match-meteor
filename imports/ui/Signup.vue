<template>
  <v-app id="vue-app-color">
    <div id="Signup">
      <v-form v-model="valid">
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

      <br />
      <br />
      <br />
      <br />
      <br />
      <p>
        Go back to
        <router-link to="/home">Login</router-link>
      </p>
    </div>
  </v-app>
</template>

<script>

export default {
  name: "Signup",

  data() {
    return {
      email: "",
      password: "",
      reenterpassword: "",
      valid: false,
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
        if(this.email == this.password){
              localStorage.setItem("user", this.email);
              this.$emit("validUser", true);
              this.$router.push({ path: "home" });
            }else{
              var errorCode = error.code;
              var errorMessage = error.message;
              alert(errorMessage);
            }
          
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
  padding: 15% 25% 25% 25%;
  block-size: 100px;
}

#vue-app-color {
  background-color: white;
}
</style>