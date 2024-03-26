<script>
export default {
	props: {
		users: { type: Object, required: true },
	},
};
</script>
<template>
	<div class="d-flex">
        <div>
            <div class="p-1">
                <strong>Username:</strong>
                {{users.username}}
            </div>
            <div class="p-1">
                <strong>Email :</strong>
                {{users.email}}
            </div>
            <div class="p-1">
                <strong>Admin:</strong>
                <i v-if="users.isAdmin" class="bi bi-check text-success"></i>
                <i v-else class="bi bi-x text-danger"></i>
            </div>
        </div>
	</div>
</template>
