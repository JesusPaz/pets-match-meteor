<template>
  <v-app id="vue-app-color" class="mb-12 mt-12">
    <v-card class="mx-auto" max-width="400">
      <v-img class="white--text align-end" height="300px" width="350px" :src="actPet.image">
        <v-card-title>{{ actPet.name }}, {{ actPet.age }}</v-card-title>
      </v-img>

      <v-card-subtitle class="pb-0">{{ actPet.gender }}</v-card-subtitle>

      <v-card-text class="text--primary">
        <div>Breed: {{ actPet.breed }}</div>
        <div>It's sterilized? : {{ actPet.isSterialized }}</div>
        <div>Wants to reproduce? {{ actPet.isReproduced }}</div>
        <div>Location: {{ actPet.city }}, {{ actPet.country }}</div>
      </v-card-text>

      <v-card-actions>
        <v-btn icon color="blue lighten-2" @click="likeDog">
          <v-icon>thumb_up</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon color="red lighten-2" @click="dislikeDog">
          <v-icon>thumb_down</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>

<script>
const axios = require("axios");

export default {
  data() {
    return {
      userName: localStorage.getItem("user"),
      actPet: {
        id: "",
        image: "",
        name: "",
        age: "",
        gender: "",
        breed: "",
        isSterialized: "",
        isReproduced: "",
        city: "",
        country: "",
        owner: ""
      }
    };
  },
  methods: {
    likeDog() {
      axios
      .post("http://localhost:3000/api/pets/like/"+this.userName+"/"+this.actPet.id)
      .catch(error => {
        console.log(error);
      });
      this.loadNextDog();
    },
    dislikeDog() {
      axios
      .post("http://localhost:3000/api/pets/dislike/"+this.userName+"/"+this.actPet.id)
      .catch(error => {
        console.log(error);
      });
      this.loadNextDog();
    },
    loadNextDog() {
      axios
        .get("http://localhost:3000/api/pets/next/admin")
        .then(response => {
          this.actPet.image = response.data.image;
          this.actPet.name = response.data.name;
          this.actPet.age = response.data.age;
          this.actPet.gender = response.data.gender;
          this.actPet.breed = response.data.breed;
          (this.actPet.isSterialized = response.data.isSterialized),
            (this.actPet.isReproduced = response.data.isReproduced);
          this.actPet.city = response.data.city;
          this.actPet.country = response.data.country;
          this.actPet.id = response.data.id;
          this.actPet.owner = response.data.owner;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.loadNextDog();
  }
};
</script>

<style>
#vue-app-color {
  margin-top: 20px;
  background-color: white;
}
</style>