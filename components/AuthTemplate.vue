<script setup lang="ts">


</script>

<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>
                    <slot name="card-header"></slot>
                </span>
               <UIToggleTheme />
            </div>
        </template>
        <div class="card-content">
            <div class="content-picture">
                <slot name="content-image"></slot>
            </div>
            <div class="content-form">
                <slot name="content-form"></slot>
                <div content-link>
                   <slot name="content-link"></slot>
                </div>
            </div>
        </div>
    </el-card>
</template>


<style scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.card-header span {
    font-size: 23px;
}
.card-content {
    display: flex; 
}

.content-picture {
    margin-right: 20px;
}

@media screen and (max-width: 700px) {
    .content-picture {
        display: none;
    }
}

</style>