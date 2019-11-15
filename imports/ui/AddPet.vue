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
      <v-image-input
        v-model="imageData"
        :image-quality="1"
        clearable
        image-format="jpeg"
        imageWidth="200"
        imageHeight="200"
      />

      <v-text-field label="Name" v-model="name" :rules="nameRules"></v-text-field>
      <v-text-field label="Age" v-model="age" :rules="ageRules"></v-text-field>

      <v-select :items="genderItems" label="Gender"></v-select>

      <v-text-field label="Breed" v-model="breed"></v-text-field>
      <v-select :items="sterilized" label="¿Sterilized?"></v-select>
      <v-select :items="reproduction" label="¿Do you want to reproduce your pet?"></v-select>
      <v-text-field label="City" v-model="city"></v-text-field>
      <v-text-field label="Country" v-model="country"></v-text-field>
      <v-spacer></v-spacer>
      <v-btn @click="submit" :disabled="!valid">Add a new pet</v-btn>
    </v-form>
  </v-app>
</template>

<script>
const axios = require("axios");
export default {
  data() {
    return {
      userName: localStorage.getItem("user"),
      genderItems: ["Male", "Female"],
      sterilized: ["Yes", "Not"],
      reproduction: ["Yes", "Not"],

      name: "",
      age: "",
      breed: "",
      imageData: null,
      city: "",
      country: "",

      nameRules: [name => !!name || "Name is required"],
      ageRules: [
        age => !!age || "Age is required",
        age => /^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/.test(age) || "Only numbers"
      ],
      breedRules: [breed => !!breed || "Breed is required"],
      imageDataRules: [imageData => !!imageData || "An image is required"],
      cityRules: [city => !!city || "City is required"],
      countryRules: [country => !!country || "Country is required"]
    };
  },
  methods: {
    submit() {
      axios.post().catch(error => {
        console.log(error);
      });
    }
  }
};
</script>

<style>
</style>