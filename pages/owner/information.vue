<template>
  <section class="mainSection " style="background-color:black;">
      <div class="content bg-white rounded shadow-sm rounded p-3 bg-dark" >

       
        <div class="bg-success text-light text-center p-2 " style="border-radius:30px; font-size:25px;">
            My Information
        </div>
        <hr>
        <p><b>Account information</b></p>
        
        <v-text-field
            rounded
            outlined
            color="black"
            label="Email"
            readonly
            dense
            v-model="owner.email"
        />

        <v-text-field
            rounded
            outlined
            color="black"
            label="Password"
            readonly
            dense
            v-model="owner.password"
        />
        <hr>
        
        <p><b>Owner information</b></p>
        
        <v-text-field
            rounded
            outlined
            color="black"
            label="Full name"
            readonly
            dense
            :value="`${owner.lname}, ${owner.fname} ${owner.mname}`.toUpperCase()"
        />

        <v-text-field
            rounded
            outlined
            color="black"
            label="Gender"
            readonly
            dense
            v-model="owner.gender"
        />

        <p><b>Vehicle information</b></p>
        
        <v-text-field
            rounded
            outlined
            color="black"
            label="Plate number"
            readonly
            dense
            v-model="owner.plate_number"
        />

        <v-text-field
            rounded
            outlined
            color="black"
            label="Serial/Chassis Number"
            readonly
            dense
            v-model="owner.serial_number"
        />

        <div class="border mb-2"></div>

        <v-text-field
            rounded
            outlined
            color="black"
            label="Vehicle Category"
            readonly
            dense
            v-model="owner.v_category"
        />

        <v-text-field
            rounded
            outlined
            color="black"
            label="Type of fuel"
            readonly
            dense
            v-model="owner.type_fuel"
        />

        <v-text-field
            rounded
            outlined
            color="black"
            label="Type of Body"
            readonly
            dense
            v-model="owner.type_body"
        />

        <v-text-field
            rounded
            outlined
            color="black"
            label="Series"
            readonly
            dense
            v-model="owner.series"
        />

        <v-text-field
            rounded
            outlined
            color="black"
            label="Color"
            readonly
            dense
            v-model="owner.color"
        />

        <div class="p-5 shadow-sm rounded  border" :style="`background-color:${owner.color};`">

        </div>
        <hr>
        <form @submit.prevent="submit" v-if="$auth.user.userType == 'officer'">
            <v-text-field
                rounded
                outlined
                color="black"
                label="Violation Code"
                v-model="violation.violation_code"
                dense
                required
            />

            <v-text-field
                type="number"
                rounded
                outlined
                color="black"
                label="Penalty"
                required
                dense
                v-model="violation.penalty"
            />

            <div class="text-center my-3">
                <v-btn type="submit" color="success" rounded small>
                    Save violation
                </v-btn>
            </div>
        </form>
        
    </div>
  </section>
</template>

<script>
export default {
    middleware:['owner-auth'],
    data(){
        return {
            owner:this.$auth.user
        }
    }
}
</script>

<style>

</style>