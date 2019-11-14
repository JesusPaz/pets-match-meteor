<template>
  <v-app>
    <v-form v-model="valid">
        <h2>Create a new dog</h2>
      <v-image-input
        v-model="imageData"
        :image-quality="1"
        clearable
        image-format="jpeg"
        imageWidth="50"
        imageHeight="50"
      />

      <v-text-field label="Name" v-model="name"></v-text-field>
      <v-text-field label="Age" v-model="age"></v-text-field>

      <v-select :items="genderItems" label="Gender"></v-select>

      <v-text-field label="Breed" v-model="breed"></v-text-field>
      <v-select :items="sterilized" label="¿Sterilized?"></v-select>
      <v-select :items="reproduction" label="¿Do you want to reproduce your pet?"></v-select>
      <v-text-field label="City" v-model="city"></v-text-field>
      <v-text-field label="Country" v-model="country"></v-text-field>
      <v-btn @click="submit" :disabled="!valid">Add a new pet</v-btn>
    </v-form>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      genderItems: ["Male", "Female", "Fizz"],
      sterilized: ["Yes", "Not"],
      reproduction: ["Yes", "Not"],

      name: "",
      age: "",
      breed: "",
      imageData: null,
      city: "",
      country: ""
    };
  },
  methods: {
    submit() {}
  }
};
</script>

<style>
</style>