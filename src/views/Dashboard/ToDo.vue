<script>
import { mapActions, mapState } from "pinia";
import d$todo from "@/stores/dashboard/todo";

import ArgonInput from "@/components/ArgonInput.vue";
import ArgonSwitch from "@/components/ArgonSwitch.vue";
import ArgonButton from "@/components/ArgonButton.vue";

export default {
  name: "ToDo",
  data: () => ({
    input: {
      title: "",
      description: "",
      category: "",
    },
  }),
  components: {
    ArgonInput,
    ArgonSwitch,
    ArgonButton,
  },
  computed: {
    ...mapState(d$todo, ["g$list"]),
  },
  methods: {
    ...mapActions(d$todo, ["a$list", "a$add"]),
    async getList() {
      try {
        await this.a$list();
      } catch (e) {
        console.error("methods getList error", e);
      }
    },
    async addList() {
      try {
        await this.a$add({ ...this.input });
        this.$router.replace({ name: "Tables" });
      } catch (e) {
        console.error("methods addList error", e);
      }
    },
  },
  async created() {
    await this.getList();
  },
};
</script>

<template>
  <div class="page-header min-vh-80">
    <div class="container">
      <div class="row">
        <div class="card mx-auto col-xl-5 col-lg-5 col-md-7 d-flex flex-column mx-lg-0">
          <div class="card-plain">
            <div class="pb-0 card-header text-start">
              <h4 class="font-weight-bolder text-center">Add Todo</h4>
            </div>
            <div class="card-body">
              <form @submit.prevent="addList">
                <div class="mb-3">
                  <label for="name" class="fs-6">Name</label>
                  <argon-input v-model="input.title" type="text" name="name" size="lg" />
                </div>
                <div class="mb-3">
                  <label for="description" class="fs-6">Description</label>
                  <argon-input v-model="input.description" type="text" name="description" size="lg" />
                </div>
                <div class="mb-3">
                  <label for="category" class="fs-6">Status</label>
                  <select v-model="input.status" class="form-select" name="status">
                    <option selected value="todo">Todo</option>
                    <option value="done">Done</option>
                  </select>
                </div>
                <div class="text-center">
                  <argon-button class="mt-4" variant="gradient" color="success" fullWidth size="lg" type="submit"> Submit </argon-button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
