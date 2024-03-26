<script>
export default {
	props: {
		products: { type: Object, required: true },
	},
};
</script>
<template>
	<div class="d-flex">
		<div class="p-1 d-fex flex-column">
			<img :src=" products.img[0]" alt="img" width="100">
		</div>
        <div>
            <div class="p-1">
                <strong>Category:</strong>
                {{products.categories}}
            </div>
            <div class="p-1">
                <strong>Price :</strong>
                {{products.price}}
            </div>
            <div class="p-1">
                <strong>Color:</strong>
                {{products.color}}
            </div>
            <div class="p-1">
                <strong>Size:</strong>
                {{products.size}}
            </div>
        </div>
	</div>
</template>
