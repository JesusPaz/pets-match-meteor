<template>
  <v-app id="vue-app-color" class="mb-12 mt-12">
    <v-card class="mx-auto" max-width="400">
      <v-img
        class="white--text align-end"
        height="300px"
        width="350px"
        src="https://images.dog.ceo/breeds/chihuahua/n02085620_3407.jpg"
      >
        <v-card-title>Inferno, 5 years</v-card-title>
      </v-img>

      <v-card-subtitle class="pb-0">Male</v-card-subtitle>

      <v-card-text class="text--primary">
        <div>Breed: Terrier</div>
        <div>It's sterilized? : Yes</div>
        <div>Wants to reproduce? Yes</div>
      </v-card-text>

      <v-card-actions>
        <v-btn color="orange" text>Like
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn color="orange" text>Dislike</v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>

<script>
export default {};
</script>

<style>
#vue-app-color {
  margin-top: 20px;
  background-color: white;
}
</style>