<template>
  <v-main>
    <v-card>
      <v-row>
        <v-col cols="4"
          ><v-text-field
            v-model="latitude"
            label="latitude"
            outlined
            clearable
            type="number"
          ></v-text-field
        ></v-col>
        <v-col cols="4">
          <v-text-field
            v-model="longitude"
            label="longitude"
            outlined
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="radius"
            label="radius"
            outlined
            clearable
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-btn color="indigo-darken-3" @click="postins()">Button</v-btn>
      </v-row>
    </v-card>
  </v-main>
</template>

<script>
export default {
  data: (vm) => ({
    a: null,
    b: null,
    latitude: null,
    longitude: null,
    radius: null,
  }),
  created() {
  },
  methods: {
    async postins() {
      let self = this;
/*   latitude: 41.0082,
            longitude: 28.9784,
            radius: 500, */
      try {
        await this.axios
          .post("http://localhost:8070/api/2.0/place", {
            latitude:self.latitude,
            longitude: self.longitude,
            radius: self.radius,
          })
          .then(function (response) {
            console.log(response);
          });
      } catch (err) {
        console.log("errr");
        console.log(err);
        console.log("errr");
      }
    },
  },
};
</script>

<style>
</style>