<template>
  <v-app id="vue-app-color" class="mb-12 mt-12">
    <v-card width="700" class="mx-auto">
      <v-toolbar color="indigo" dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>My Pets</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>
      <v-list>
        <v-list-item v-for="item in items" :key="item.title">
          <v-list-item-icon>
            <v-icon v-if="item.icon" color="pink">mdi-star</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="item.name"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-content>
            <v-list-item-subtitle v-text="item.breed"></v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-content>
            <v-list-item-subtitle v-text="item.age"></v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <button @click="deletePet(item._id)">Delete</button>
          </v-list-item-action>

          <v-list-item-avatar>
            <v-img :src="item.image"></v-img>
          </v-list-item-avatar>
        </v-list-item>
      </v-list>
    </v-card>

    <router-link :to="'/addpet'">
      <v-btn absolute dark fab center right color="blue">Add</v-btn>
    </router-link>
  </v-app>
</template>

<script>
const axios = require("axios");
export default {
  data() {
    return {
      userName: localStorage.getItem("user"),
      items: [
        {
          icon: true,
          name: "El mata gente",
          age: "4 years",
          gender: "male",
          breed: "Pitbul",
          city: "cali",
          _id: null,
          image: "https://cdn.vuetifyjs.com/images/lists/1.jpg"
        }
      ]
    };
  },

  mounted() {
    axios
      .get("http://localhost:3000/api/mypets/" + this.userName)
      .then(response => {
        var rq = response.data;
        this.items = rq;
      })
      .catch(error => {
        console.log(error);
      });
  },

  methods: {
    deletePet(idUser) {
      axios
        .post("http://localhost:3000/api/delete/"+idUser)
        .then(
          this.loadPets(),
          )
        .catch(error => {
          console.log(error);
        });
    },
    loadPets() {
      axios
        .get("http://localhost:3000/api/mypets/" + this.userName)
        .then(response => {
          var rq = response.data;
          this.items = rq;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style>
#vue-app-color {
  background-color: white;
}
</style>