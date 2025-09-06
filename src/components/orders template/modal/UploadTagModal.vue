<script setup lang="ts">

</script>
<template>
    <div class="modal fade" id="uploadmodal" tabindex="-1" aria-labelledby="uploadmodallabel" aria-hidden="true">
    <div class="upload-modal-container  modal-dialog modal-content">
        <div class="modal-body">
            <div class="title-upload">
                <h2 class="font-24 MuseoSemiBold">Would you like to upload your own pallet label?</h2>
            </div>
            <div class="upload-content-btn">
                <div class="img-btn-upload">
                    <img src="/iconbuttons/upload-icon.svg" alt="">
                </div>
                <div  class="paragraph-upload">
                    <p>Upload a document with the tag</p> 
                </div>
            </div>
            <div>
                {{ $t("Acceptedfileformat") }}
            </div>
            <button class="btn-save-atr-upload">Upload</button>
            <!--<button class="btn-cancel-atr close" data-dismiss="modal" aria-label="Close">Cancel</button>-->
        </div>
    </div>
    </div>
</template>
<style scoped>
    .upload-modal-container{
        position: fixed;
        top:0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        max-width: 689px;
        height: 470px;
        background-color: var(--sectionSuperior);
        padding: 4.3rem 0;
        margin: auto;
        border-radius: 15px;
        box-shadow: 1px 3px 20px -2px #00000021;
        overflow: hidden;
        border: none;
    }

    .paragraph-upload {
        margin: 0.945rem 0;
        text-align: center;
        line-height: 0.3rem;
        font-size: 0.8em;
        color: var(--textButton);
    }

    .title-upload h2 {
        text-align: center;
        font-weight: 700;
        color: #000;
        font-size: 1.51em;
    }

    .btn-cancel-atr{
        display: block;
        background-color: transparent;
        color: var(--textButton);
        border: none;
        font-size: 1.44em;
        margin: 1.19rem auto;
    }

    .btn-save-atr-upload{
        display: block;
        border: solid 1px var(--textButton);
        border-radius: 30px;
        background-color: var(--textButton);
        line-height: 1rem;
        font-size: 1.44em;
        padding: 1.44rem 1.57rem;
        color: #fff;
        margin: 2.2rem auto 0;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .btn-save-atr-upload:hover {
        color: var(--textButton);
        background: white ;
        transition: all 0.3s ease;
    }

    .upload-content-btn {
        width: 395px;
        height: 170px;
        margin: 40px auto 0;
        border: dotted 1px var(--textNotFeatured);
    }

    .upload-content-btn img{
        display: block;
        margin: 54px auto 0;
        cursor: pointer;
    }
</style>