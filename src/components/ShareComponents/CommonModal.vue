<template>
    <DialogPanel>
      <DialogTitle>Deactivate account</DialogTitle>
      <DialogDescription>
        This will permanently deactivate your account
      </DialogDescription>

      <p>
        Are you sure you want to deactivate your account? All of your data will
        be permanently removed. This action cannot be undone.
      </p>

      <button @click="setIsOpen(false)">Deactivate</button>
      <button @click="setIsOpen(false)">Cancel</button>
    </DialogPanel>
</template>
<script>
import {
  DialogPanel,
  DialogTitle,
  DialogDescription,
} from "@headlessui/vue";

export default {
  data() {
    return {
    };
  },
  methods: {
  },
  components: {
    DialogPanel,
    DialogTitle,
    DialogDescription,
  },
};
</script>
