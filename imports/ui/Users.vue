<template>
  <v-app id="vue-app-color">
    <div id="Users">
      <v-form ref="form" v-model="valid" class="mb-12 mt-12">
        <h3>Create new User</h3>
        <v-text-field label="Name" v-model="user.name" :rules="nameRules"></v-text-field>
        <v-text-field label="Last Name" v-model="user.lastname" :rules="lastnameRules"></v-text-field>
        <v-text-field label="Email" v-model="user.email" :rules="emailRules"></v-text-field>
        <v-text-field label="Password" :type="'password'" v-model="user.password"></v-text-field>
        <v-text-field label="Final Valid Date" v-model="user.validto"></v-text-field>

        <v-select v-model="user.dependency" :items="namedependencies" label="Dependency"></v-select>
        <v-select v-model="user.active" :items="ops" label="Enabled"></v-select>
        <v-btn :disabled="!valid" @click="submit">Submit</v-btn>
      </v-form>
      <div>
        <h3>All Users</h3>
        <v-card class="mt-6 mb-12">
          <v-card-title>
            <v-text-field v-model="search" label="Search" single-line hide-details></v-text-field>
          </v-card-title>
          <v-data-table
            :search="search"
            :headers="headers"
            :items="deps"
            sort-by="name"
            class="elevation-1"
          >
            <template v-slot:top></template>
            <template v-slot:item.action="{ item }">
              <v-icon small class="mr-2" @click="editUser(item)">edit</v-icon>
              <v-icon small @click="deleteUser(item)">delete</v-icon>
            </template>
          </v-data-table>
        </v-card>
      </div>
    </div>
  </v-app>
</template>

<script>


export default {
  name: "Users",

  data() {
    return {
      valid: false,
      deps: [],
      namedependencies: [],
      ops: ["True", "False"],

      search: "",
      headers: [
        { text: "Name", value: "name" },
        { text: "Lastname", value: "lastname" },
        { text: "Email", value: "email" },
        { text: "Password", value: "password" },
        { text: "Valid To", value: "validto" },
        { text: "Dependency", value: "dependency" },
        { text: "Active", value: "active" },
        { text: "Actions", value: "action", sortable: false }
      ],

      user: {
        name: "",
        lastname: "",
        email: "",
        password: "",
        validto: "",
        dependency: "",
        active: ""
      },

      nameRules: [
        name => !!name || "User Name is required",
        name => name.length > 4 || "User Name must be longer than 4 chars"
      ],
      lastnameRules: [
        name => !!name || "User Lastname is required",
        name => name.length > 4 || "User Lastname must be longer than 4 chars"
      ],
      passwordRules: [
        password => !!password || "Password is required",
        password =>
          /^([a-zA-Z0-9]{6,14})+$/.test(password) ||
          "The password must have uppercase and a size between 6 and 14 characters"
      ],
      emailRules: [
        email => !!email,
        email =>
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(
            email
          ) || "Write a correct email"
      ]
    };
  },

  mounted() {
    this.getDeps();
    this.getDepeIds();
  },
  computed: {
    items: function() {
      return this.deps;
    }
  },

  methods: {
    submit() {

    },
    editUser(userParam) {
      this.user.name = userParam.name;
      this.user.lastname = userParam.lastname;
      this.user.email = userParam.email;
      this.user.password = userParam.password;
      this.user.validto = userParam.validto;
      this.user.dependency = userParam.dependency;
      this.user.active = userParam.active;
      console.log(this.users);
    },
    deleteUser(userParam) {
      
    },
    async getDeps() {
      
    },
    async getDepeIds() {
      
    }
  }
};
</script>

<style>
#vue-app-color {
  background-color: white;
}
</style>