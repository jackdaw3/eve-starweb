<template>
    <footer class="footer">
        <el-image style="height: 35px; cursor: pointer" src="partner.png" @click="goToPartner" />

        <h6 class="text-muted" style="opacity: 0.6; font-style: italic; margin-top: 6px;">
            EVE Online and the EVE logo are the registered trademarks of CCP
            hf. All rights are reserved worldwide. All other trademarks are the property of their
            respective
            owners. EVE Online, the EVE logo, EVE and all associated logos and designs are the
            intellectual
            property of CCP hf. All artwork, screenshots, characters, vehicles, storylines, world facts
            or
            other recognizable features of the intellectual property relating to these trademarks are
            likewise the intellectual property of CCP hf.
        </h6>

        <div style="float: right; margin-top: -30px; margin-right: 6px; opacity: 0.7; font-style: italic; ">
            <span class="title" @click="goToPrivacy">Privacy</span>
            <span class="separator">/</span>
            <span class="title" @click="goToFAQ">FAQ</span>
            <span class="separator">/</span>
            <span class="title" @click="goToGithub">GitHub</span>
        </div>
    </footer>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

function goToPartner() {
    window.open("https://www.eveonline.com/partners", '_blank')
}

function goToPrivacy() {
    router.push("/privacy")
}

function goToFAQ() {
    router.push("/faq")
}

function goToGithub() {
    window.open("https://github.com/jackdaw3/eve-starweb", '_blank')
}
</script>
<style>
.footer {
    position: fixed;
    bottom: 0;
    left: 4%;
    width: 92%;
    padding: 1rem 1rem 0;
    text-align: left;
}

.footer .title {
    font-size: 0.7em;
    cursor: pointer;
}

.footer .title:hover {
    color: #409EFF;
}

.footer .separator {
    margin: 0 9px;
    font-weight: 300;
    font-size: 12px;
}

</style>