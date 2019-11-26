<template>
  <v-app id="vue-app-color" class="mb-12 mt-12">
    <v-form v-model="valid">
      <v-toolbar color="indigo" dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>Add a new pet</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-img
        class="white--text align-end"
        height="300px"
        width="350px"
        :src="imageLink"
        style="display: block;
          margin-left: auto;
          margin-right: auto;
          margin-top: 3%;
          margin-bottom:3%;
          width: 50%;"
      ></v-img>
      <div style="text-align:center; margin-bottom: 3%;">
        <v-btn @click="randomImage">Generate a ramdom image</v-btn>
      </div>
      <v-text-field label="Image Link" v-model="imageLink" :rules="imageDataRules"></v-text-field>

      <v-text-field label="Name" v-model="name" :rules="nameRules"></v-text-field>
      <v-text-field label="Age in years" v-model="age" :rules="ageRules"></v-text-field>

      <v-select :items="genderItems" label="Gender" v-model="gender"></v-select>

      <v-text-field label="Breed" v-model="breed"></v-text-field>
      <v-select :items="sterilizedItems" label="¿Sterilized?" v-model="isSterialized"></v-select>
      <v-select
        :items="reproductionItems"
        label="¿Do you want to reproduce your pet?"
        v-model="isReproduced"
      ></v-select>
      <v-text-field label="City" v-model="city"></v-text-field>
      <v-text-field label="Country" v-model="country"></v-text-field>
      <v-spacer></v-spacer>
      <div style="text-align:center; margin-bottom: 3%;">
      <v-btn @click="submit" :disabled="!valid">Add a new pet</v-btn>
      </div>
    </v-form>
    <br>
    <br>
    <v-alert
      :value="alert"
      type="success"
      dismissible
      color="cyan"
      border="left"
      elevation="2"
      colored-border
      transition="scale-transition"
    >
      A new pet has been added correctly :3.
    </v-alert>
    
  </v-app>
</template>

<script>
const axios = require("axios");
// Production
const url = "https://pets-match.herokuapp.com";
// Development
// const url = "http://localhost:3000"

export default {
  data() {
    return {
      alert: false,
      userName: localStorage.getItem("user"),
      genderItems: ["Male", "Female"],
      sterilizedItems: ["Yes", "No"],
      reproductionItems: ["Yes", "No"],
      name: "",
      age: "",
      breed: "",
      gender: "",
      imageLink: "",
      isSterialized: "",
      isReproduced: "",
      city: "",
      country: "",
      valid: false,
      nameRules: [name => !!name || "Name is required"],
      ageRules: [
        age => !!age || "Age is required",
        age => /^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/.test(age) || "Only numbers"
      ],
      breedRules: [breed => !!breed || "Breed is required"],
      imageDataRules: [imageLink => !!imageLink || "An image is required"],
      cityRules: [city => !!city || "City is required"],
      countryRules: [country => !!country || "Country is required"]
    };
  },
  methods: {
    submit() {
      axios
        .post(url + "/api/addpet/", {
          pet: {
            name: this.name,
            age: this.age +" years",
            gender: this.gender,
            breed: this.breed,
            image: this.imageLink,
            isSterialized: this.isSterialized,
            isReproduced: this.isReproduced,
            city: this.city,
            country: this.country,
            owner: this.userName
          }
        })
        .catch(error => {
          console.log(error);
        })
        .then(
          this.alert = true,
          //creaning all the inputs

          (this.age = ""),
          (this.breed = ""),
          (this.gender = ""),
          (this.imageLink = ""),
          (this.isSterialized = ""),
          (this.isReproduced = ""),
          (this.city = ""),
          (this.country = ""),
          (this.name = ""),
          this.$router.push({ path: "mypets" })
        );
    },
    randomImage() {
      axios
        .get("https://dog.ceo/api/breeds/image/random")
        .then(response => {
          this.imageLink = response.data.message;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.randomImage();
  }
};
</script>

<style>
</style>