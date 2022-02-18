<template>
  <div id="app" >
  <div id="inspire">
    <v-footer
      color="red"
      dark
      fixed
    >
    
    <div class="container">
      <div>
        <v-row>
          <v-col cols="2">
            
          </v-col>  
        </v-row>
        <v-row>
          <v-col>

          </v-col>
          <v-spacer></v-spacer>
          <v-col>
            <v-btn rounded light @click="$router.back()"> Visszalépek</v-btn>
          </v-col>

        </v-row>
        
      </div>
      
      </div>
    </v-footer>
  </div>
</div>
</template>

<script>
export default {

}
</script>

<style>
</style>