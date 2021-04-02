<template>
  <section class="overlay" style="z-index:50;">
      <div class="bg-white rounded" data-aos="zoom-in">
          <div class="bg-success text-light p-2 ">
              Violation details

              <v-icon @click="$emit('close')" style="float:right;">
                  mdi-close
              </v-icon>
          </div>

          <div class="p-3 pt-5" style="min-height:50vh;">
              <v-text-field
                
                label="Violation"
                readonly
                dense
                color="black"
                v-model="violation.violation_code"
              />

              <v-text-field
                type="number"
                label="Penalty"
                readonly
                dense
                color="black"
                v-model="violation.penalty"
              />

              <b><small>{{violation.created}}</small></b>

              <hr>
              
              <b>Owner</b>
              
              <v-text-field
                rounded
                outlined
                color="black"
                label="Full name"
                readonly
                dense
                :value="`${violation.owner.lname}, ${violation.owner.fname} ${violation.owner.mname}`.toUpperCase()"
            />

            <v-text-field
                rounded
                outlined
                color="black"
                label="Gender"
                readonly
                dense
                v-model="violation.owner.gender"
            />

            <p><b>Vehicle information</b></p>
            
            <v-text-field
                rounded
                outlined
                color="black"
                label="Plate number"
                readonly
                dense
                v-model="violation.owner.plate_number"
            />

            <v-text-field
                rounded
                outlined
                color="black"
                label="Serial/Chassis Number"
                readonly
                dense
                v-model="violation.owner.serial_number"
            />

            <div class="border mb-2"></div>

            <v-text-field
                rounded
                outlined
                color="black"
                label="Vehicle Category"
                readonly
                dense
                v-model="violation.owner.v_category"
            />

            <v-text-field
                rounded
                outlined
                color="black"
                label="Type of fuel"
                readonly
                dense
                v-model="violation.owner.type_fuel"
            />

            <v-text-field
                rounded
                outlined
                color="black"
                label="Type of Body"
                readonly
                dense
                v-model="violation.owner.type_body"
            />

            <v-text-field
                rounded
                outlined
                color="black"
                label="Series"
                readonly
                dense
                v-model="violation.owner.series"
            />

            <v-text-field
                rounded
                outlined
                color="black"
                label="Color"
                readonly
                dense
                v-model="violation.owner.color"
            />
          </div>
      </div>
  </section>
</template>

<script>
export default {
    props:{
        violation:Object
    }
}
</script>

<style scoped>
    .overlay{
        overflow-y: scroll;
        
    }
    .overlay > div{
        
        margin:15% 10px;
    }

    @media only screen and (max-width: 360px) {
        .overlay{
            overflow-y: scroll;
            padding:5% 10px;
        }
        .overlay > div{
            margin:15% 10px;
        }
    }
</style>