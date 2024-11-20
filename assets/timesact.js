timesactScriptNew=async function(t){let e=document.createElement("style");e.id="TimesactCSS",e.innerHTML=`.timesact-badge-ribbon span::before {
    content: "";
    position: absolute; left: 0px; top: 100%;
    z-index: -1;
    border-left: 3px solid #888888;
    border-right: 3px solid transparent;
    border-bottom: 3px solid transparent;
    border-top: 3px solid #888888;
}
.timesact-badge-ribbon span::after {
    content: "";
    position: absolute; right: 0px; top: 100%;
    z-index: -1;
    border-left: 3px solid transparent;
    border-right: 3px solid #888888;
    border-bottom: 3px solid transparent;
    border-top: 3px solid #888888;
}
.md-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 40%;
    height: auto;
    z-index: 2000;
    visibility: hidden;
    transform: translateX(-50%) translateY(-50%);
}
.md-content {
    background: #fff;
    position: relative;
    border-radius: 10px;
    margin: 0 auto;
}
.md-show {
    visibility: visible;
}
.md-show ~ .md-overlay {
    opacity: 1;
    visibility: visible;
    display: block;
}
.popup-container {
    min-height: 100%;
    display: none;
}
.md-overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    visibility: hidden;
    top: 0;
    left: 0;
    z-index: 1000;
    opacity: 0;
    background: #c9c9c9c2;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
}
.md-body {
    text-align: center;
    padding-top: 10%;
    padding-bottom: 10%;
    font-family: "Roboto";
}
p.message {
      padding: 20px;
}
.md-close {
    background: #f70427;
    border: none;
    color: white;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
}
@media screen and (max-width: 32em) {
    .md-modal { width: 80%; }
}
.timesact_bis_popup_overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1040;
    visibility: hidden;
    width: 100vw;
    height: 100vh;
    background-color: #000;
    opacity: .5;
    display: block !important;
}

.timesact_bis_dialog {
    display: inline-table;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1050;
    visibility: hidden;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    outline: 0;
}

.timesact_bis_popup_overlay_show,
.timesact_bis_dialog_show {
    visibility: visible;
}

.timesact_bis_popup {
    z-index: 1000000;
    background: #fff;
    color: #000;
    margin: auto;
    pointer-events: none;
    max-width: 460px;
    width: 96%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: fixed;
    border-radius: 10px;
    font-size: 14px;
    /*add dynamic value*/
}

.timesact_bis_popup_content {
    pointer-events: auto;
    position: relative
}

.timesact_bis_popup_body {
    padding: 20px;
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: .3rem
}

.timesact_bis_close_button {
    padding: 5px;
    background: 0 0;
    font-size: 1.4rem;
    font-weight: 700;
    line-height: 1;
    opacity: 1;
    cursor: pointer;
    outline: 0;
    border-radius: 0;
    position: absolute;
    top: 0;
    right: 0;
    border: 0
}

.timesact_bis_close_span {
    display: inline-block;
    height: 20px;
    width: 20px;
    color: #000;
    margin-top: 0;
}

.timesact_bis_heading {
    margin-bottom: 0;
    color: #000;
    /*dynamic value*/
    margin-top: 0;
    font-size: calc(2 * 1em);
    /*dynamic value*/
    font-weight: 700
}

.timesact_bis_desc {
    margin-bottom: 0;
    color: #000;
    /*dynamic value*/
    font-size: 14px;
    /*dynamic value*/
}

.timesact_bis_line {
    margin: 10px 0
}

.timesact_bis_form_field {
    margin-top: 10px
}

.timesact_bis_input {
    padding: 8px 15px;
    border: 1px solid #949494;
    background-color: #fff;
    color: #000;
    max-width: 100%;
    line-height: 1.2;
    width: 100%;
    outline: 0;
    border-radius: 10px;
    /*dynamic value*/
}

.timesact_bis_submit_button {
    width: 100%;
    outline: 0;
    border: 0;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #000;
    /*dynamic value*/
    color: #fff;
    /*dynamic value*/
    border-radius: 10px;
    /*dynamic value*/
    font-size: 14px;
    cursor: pointer;
}

.timesact_bis_submit_button--disabled {
    background: #ddd
}

.timesact_bis_loading_icon {
    width: 15px !important;
    height: 15px !important;
    margin-right: 5px !important;
}

.timesact_bis_loading_icon:after {
    content: " ";
    display: block;
    width: 15px !important;
    height: 15px !important;
    border-radius: 50%;
    border: 2px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: timesact-bis-loading 1.2s linear infinite
}

@keyframes timesact-bis-loading {
    0% {
        transform: rotate(0)
    }

    100% {
        transform: rotate(360deg)
    }
}

.timesact_bis_note {
    color: black;
    font-size: 80%;
    margin-bottom: 0
}

.timesact_bis_response {
    margin-bottom: 0;
}

.timesact_bis_message_success {
    width: 100%;
    text-align: center;
    font-weight: 600;
    display: none;
    color: #28a745;
}

.timesact_bis_message_error {
    width: 100%;
    text-align: center;
    font-weight: 600;
    display: none;
    color: red;
}

.timesact_powered_by {
    margin-top: 15px;
    left: 0;
    right: 0;
    text-align: center;
}

.timesact_powered_by a {
  text-decoration: none;
  color: #000 !important;
  font-weight: 700;
}

.timesact_bis_field_empty {
  border: 1px solid red;
}

.timesact_bis_message_show {
    display: block !important;
}

.timesact-button:after {
    content: none
}

.timesact-button:before {
    content: none
}
.timesact_bis_subscribe {
  font-size: 80%;
}
  `,document.getElementsByTagName("head")[0].appendChild(e),document.getElementsByTagName("body")[0].insertAdjacentHTML("afterbegin",'<div class="md-modal" id="mixed-modal"><div class="md-content"><div class="md-body"></div></div></div><div class="popup-container"><div class="column"><button class="md-trigger md-setperspective" data-modal="mixed-modal"></button></div></div><div class="md-overlay"></div>');let i=`<div class="timesact_bis_popup_overlay"></div>
<div aria-modal="true" aria-hidden="true" tabindex="-1" role="dialog" class="timesact_bis_dialog">
<div class="timesact_bis_popup">
<div class="timesact_bis_popup_content">
<div class="timesact_bis_popup_body">
<button type="button" data-dismiss="modal" aria-label="Close"
    class="timesact_bis_close_button">
    <span aria-hidden="true" class="timesact_bis_close_span">x</span>
</button>
<h3 class="timesact_bis_heading"></h3>
<p class="timesact_bis_desc"></p>
<p class="timesact_bis_response">
    <span class="timesact_bis_message_success"></span>
    <span class="timesact_bis_message_error"></span>
     
</p>
<hr class="timesact_bis_line">
<div id="subscriptionForm">
    <div class="timesact_bis_form_field">
        <input id="timesact_bis_email" class="timesact_bis_input " type="email"
        placeholder="eg. username@example.com" name="email" value="">
    </div>
    <div class="timesact_bis_form_field">
        <button type="button" class="timesact_bis_submit_button ">
            <span class="timesact_bis_loading_icon"></span>
        </button>
    </div>
    <div class="timesact_bis_form_field">
        <p class="timesact_bis_note"></p>
    </div>
    <div class="timesact_bis_form_field timesact_sub">
        <input type="checkbox" id="newsletter" name="newsletter" checked />
        <label class="timesact_bis_subscribe" for="newsletter"></label>
    </div>
</div>
<div class="timesact_powered_by">
    <a href="https://timesact.com" target="_blank" rel="noreferrer">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8 24l2.674-9h-9.674l16-15-2.674 9h8.674l-15 15zm-1.586-11h6.912l-1.326 4 5.739-6h-6.065l1.304-4-6.564 6z"></path></svg>
        <span>by Timesact</span>
    </a>
</div>
</div>
</div>
</div>
</div>`;document.getElementsByTagName("body")[0].insertAdjacentHTML("afterbegin",i);let s=document.querySelector("#timesact_bis_email");document.querySelector("#newsletter");class a{add(e,i,s,a){if("RIBBON"===i){t(e).remove(`.timesact-badge-common-${a}`),t(e).remove(`.timesact-badge-ribbon-${a}`),t(e).append(`<div class='timesact-badge-ribbon timesact-badge-ribbon-${a}'><span class='timesact-badge-ribbon-span-${a}'>`+s+"</span></div>");return}"ROUNDED"===i&&(t(e).remove(`.timesact-badge-common-${a}`),t(e).remove(`.timesact-badge-ribbon-${a}`),t(e).append(`<div class='timesact-badge-common-${a}'><span class='timesact-badge-rounded-span-${a}'>`+s+"</span></div>")),"SQUARE"===i&&(t(e).remove(`.timesact-badge-common-${a}`),t(e).remove(`.timesact-badge-ribbon-${a}`),t(e).append(`<div class='timesact-badge-common-${a}'><span class='timesact-badge-square-span-${a}'>`+s+"</span></div>")),"CIRCLE"===i&&(t(e).remove(`.timesact-badge-common-${a}`),t(e).remove(`.timesact-badge-ribbon-${a}`),t(e).append(`<div class='timesact-badge-common-${a}'><span class='timesact-badge-circle-span-${a}'>`+s+"</span></div>"))}applyStyles(e,i){t(".timesact-badge").css({position:"relative"}),t(`.timesact-badge-ribbon-${i}`).css({position:"absolute",right:"-5px",top:"-5px","z-index":"1",overflow:"hidden",width:"75px",height:"75px","text-align":"right"}),t(`.timesact-badge-ribbon-${i} span`).css({"font-size":`${e.fontSize}px`,"font-weight":"bold",color:e.fontColor,"text-transform":"uppercase","text-align":"center","line-height":"20px",transform:"rotate(45deg)","-webkit-transform":"rotate(45deg)",width:"100px",display:"block",position:"absolute",top:"19px",right:"-21px"}),t(`.timesact-badge-ribbon-span-${i}`).css({"background-color":e.backgroundColor,"box-shadow":"0 3px 10px -5px rgba(0, 0, 0, 1)"}),t(`.timesact-badge-rounded-span-${i}`).css({border:"1px solid transparent","border-radius":"4rem",display:"inline-block","letter-spacing":".1rem","line-height":"1",padding:"0.6rem 1.3rem","text-align":"center","background-color":e.backgroundColor,"border-color":e.backgroundColor,"font-size":`${e.fontSize}px`,color:e.fontColor,"font-weight":"bold","word-break":"break-word"}),t(`.timesact-badge-square-span-${i}`).css({border:"1px solid transparent",display:"inline-block","letter-spacing":".1rem","line-height":"1","text-align":"center","background-color":e.backgroundColor,"border-color":e.backgroundColor,"font-size":`${e.fontSize}px`,color:e.fontColor,"font-weight":"bold","word-break":"break-word",height:"60px",width:"60px","padding-top":"15px"}),t(`.timesact-badge-circle-span-${i}`).css({border:"1px solid transparent","border-radius":"50%",display:"inline-block","letter-spacing":".1rem","line-height":"1","text-align":"center","background-color":e.backgroundColor,"border-color":e.backgroundColor,"font-size":`${e.fontSize}px`,color:e.fontColor,"font-weight":"bold","word-break":"break-word",height:"60px",width:"60px","padding-top":"15px"}),t(`.timesact-badge-common-${i}`).css({top:"1rem",display:"flex","flex-wrap":"wrap",right:"10px",position:"absolute","z-index":"1"})}}class o{display(e){t(".md-body").append("<h3>"+e.header+'</h3><p class="message">'+e.body+'</p><button class="md-close">'+e.button+'</button><p><input type="checkbox" id="md-stop" name="md-stop"><label for="md-stop">'+e.stop+"</label></p>"),t("#mixed-modal").addClass("md-show"),t(".md-close, .md-overlay").click(function(){window.localStorage.setItem("showCartMixedAlert",!t("#md-stop").is(":checked")),t("#mixed-modal").removeClass("md-show")}),t(".md-close").attr("style",`
background: ${e.buttonBackgroundColor}!important;
color: ${e.buttonFontColor}!important;`)}}class r{constructor(t,e,i){this.id=t,this.variants=e,this.title=i}setActiveVariant(t){this.variantId=t}setTimesactVariants(t){if(!t||!t.variants){console.log("[ERROR 2002]: Product config is undefined.");return}this.timesactVariants=t.variants}isPOEnabledForVariant(){return!!this.timesactVariants[this.variantId]&&!!this.timesactVariants[this.variantId].config&&("isPOEnabled"in this.timesactVariants[this.variantId]?this.timesactVariants[this.variantId].isPOEnabled:"ACTIVE"===this.timesactVariants[this.variantId].config.status||"NO_STOCK"===this.timesactVariants[this.variantId].config.status)}isBISEnabledForVariant(){return!!this.timesactVariants[this.variantId]&&(window.ta.currentTimesactProductData.variantId=this.variantId,window.ta.currentTimesactProductData.productName=this.timesactVariants[this.variantId].displayName,this.timesactVariants[this.variantId].isBISEnabled)}isCSEnabledForVariant(){return!!this.timesactVariants[this.variantId]&&this.timesactVariants[this.variantId].isCSEnabled}getVariantSettings(t,e,i){if(!this.timesactVariants[this.variantId].config.settingsTemplate){let s=t[e];if(!this.hasCustomSettings())return s;let a=this.timesactVariants[this.variantId].settings;return{button:{...s.button,name:a.buttonName||s.button.name},message:{...s.message,type:a.messageType||s.message.type,value:a.messageValue||s.message.value},cart:{...s.cart,labelText:{key:a.cartLabelTextKey||s.cart.labelText.key,value:a.cartLabelTextValue||s.cart.labelText.value}},badge:s.badge}}return"PO"===i?this.timesactVariants[this.variantId].config.settingsTemplate in t?t[this.timesactVariants[this.variantId].config.settingsTemplate]:t[e]:"BIS"===i?this.timesactVariants[this.variantId].configBIS.settingsTemplate in t?t[this.timesactVariants[this.variantId].configBIS.settingsTemplate]:t[e]:"CS"===i&&this.timesactVariants[this.variantId].configCS.settingsTemplate in t?t[this.timesactVariants[this.variantId].configCS.settingsTemplate]:t[e]}hasCustomSettings(){return!!this.timesactVariants[this.variantId].settings&&"CUSTOM"===this.timesactVariants[this.variantId].settings.type}isVariantOutOfStock(){if(!this.timesactVariants[this.variantId])return!1;let t=this.timesactVariants[this.variantId];return!(t.quantity>0)&&"DENY"===t.inventoryPolicy}}class n{extractVariantId(e,i){var s=window.location.search.match(/variant=([0-9]+)/);if(null!=s)return s[1];let a="radio"===t(i).find("select[name='id'], input[name='id'], select[name='id[]'], input[name='id[]']").attr("type")?t(i).find("input[name='id']:checked, input[name='id[]']:checked").val():t(i).find("select[name='id'], input[name='id'], select[name='id[]'], input[name='id[]']").val();return e.some(t=>t.id.toString()===a)?a:e[0].id}}class d{static createListeners(){t(".timesact_bis_input").focusout(function(){let e=t(".timesact_bis_input");e.val()&&e.hasClass("timesact_bis_field_empty")&&(e.removeClass("timesact_bis_field_empty"),t(".timesact_bis_message_success").removeClass("timesact_bis_message_show"),t(".timesact_bis_message_error").removeClass("timesact_bis_message_show"))}),t(".timesact_bis_close_button").click(d.hidenBisModal),t(".timesact_bis_submit_button").click(d.createSubscription)}static displayBisModal(){let{defaultSettings:e,productId:i,productVariants:s,variantId:a}=window.ta.currentTimesactProductData,o=new r(i,s);o.setActiveVariant(a),o.setTimesactVariants({variants:s});let{form:n}=o.getVariantSettings(window.ta.settings,e.templates.BIS,"BIS");t("h3.timesact_bis_heading").attr("style",`color: ${n.headingFontColor} !important;`),t("#subscriptionForm .timesact_bis_submit_button").attr("style",`
background: ${n.buttonBackgroundColor} !important;
color: ${n.buttonFontColor} !important;
border-radius: ${n.fieldsBorderRadius}px !important;
font-size: ${n.fontSize}px !important;`),t("#subscriptionForm .timesact_bis_input").attr("style",`
border-radius: ${n.fieldsBorderRadius}px !important;
font-size: ${n.fontSize}px !important;`),t(".timesact_bis_popup").attr("style",`border-radius: ${n.popupBorderRadius}px !important;`),t(".timesact_bis_desc, .timesact_bis_note, .timesact_bis_subscribe").attr("style",`color: ${n.textFontColor} !important;`),t(".timesact_bis_email").attr("style",`border-radius: ${n.fieldsBorderRadius}px !important;`),t(".timesact_bis_heading").text(n.heading),t(".timesact_bis_desc").text(n.description),t(".timesact_bis_submit_button").text(n.buttonName),t(".timesact_bis_form_field .timesact_bis_note").text(n.note),t(".timesact_bis_form_field .timesact_bis_subscribe").text(n.messageNewsletter),t(".timesact_bis_message_success").text(n.messageSuccess),t(".timesact_bis_message_error").text(n.messageError),n.isNewsletterEnabled||t(".timesact_sub").attr("style","display: none;"),t(".timesact_bis_popup_overlay").addClass("timesact_bis_popup_overlay_show"),t(".timesact_bis_dialog").addClass("timesact_bis_dialog_show"),n.isBrandEnabled||t(".timesact_powered_by").hide()}static hidenBisModal(){t(".timesact_bis_popup_overlay").removeClass("timesact_bis_popup_overlay_show"),t(".timesact_bis_dialog").removeClass("timesact_bis_dialog_show"),t(".timesact_bis_message_success").removeClass("timesact_bis_message_show").html(""),t(".timesact_bis_message_error").removeClass("timesact_bis_message_show").html(""),s.value=""}static async createSubscription(){let e=t(".timesact_bis_message_success"),i=t(".timesact_bis_message_error"),a=t(".timesact_bis_input");if(!s.value){a.addClass("timesact_bis_field_empty");return}let o={type:"EMAIL",status:"PENDING",value:s.value,productId:window.ta.currentTimesactProductData.productId,variantId:window.ta.currentTimesactProductData.variantId,productName:window.ta.currentTimesactProductData.productName,isSubNewsletter:t("#newsletter").is(":checked")},r=await m.createSubscription(o);r&&i.removeClass("timesact_bis_message_show")&&e.addClass("timesact_bis_message_show")&&t("#timesact_bis_email").val(""),!r&&e.removeClass("timesact_bis_message_show")&&i.addClass("timesact_bis_message_show")}}class c{constructor(e,i){this.addToCartButtonSelector=e,this.hasInsideSpan=!!t(this.addToCartButtonSelector).first().prop("tagName")&&"span"===t(this.addToCartButtonSelector).first().prop("tagName").toLowerCase(),"timesact-button-po"===i?this.button=e:(this.button=t(`<button type="button" class="${i}" />`).attr("style","display: none !important;"),this.hasInsideSpan?t(this.addToCartButtonSelector).first().parent().after(this.button):t(this.addToCartButtonSelector).first().after(this.button))}showPO(e){this.hasInsideSpan?t(this.button).parent().show():t(this.button).show(),t(this.button).val(e.button.name),t(this.button).text(e.button.name),t(this.button).prop("disabled",!1),"DEFAULT"!==e.button.type&&(this.hasInsideSpan?t(this.button).first().parent().addClass("timesact-button"):t(this.button).first().addClass("timesact-button"),this.applyStyles(e.button.style,"timesact-button"))}showBIS(e){t(this.button).text(e.button.name),this.applyStyles(e.button.style,"timesact-button-bis"),t(this.button).click(d.displayBisModal),t(this.button).show(),this.hasInsideSpan?t(this.addToCartButtonSelector).first().parent().attr("style","display: none !important;"):t(this.addToCartButtonSelector).first().attr("style","display: none !important;")}showCS(e){t(this.button).text(e.button.name),this.button.prop("disabled",!0),this.applyStyles(e.button.style,"timesact-button-cs"),t(this.button).show(),this.hasInsideSpan?t(this.addToCartButtonSelector).first().parent().attr("style","display: none !important;"):t(this.addToCartButtonSelector).first().attr("style","display: none !important;")}showAddToCart(){this.hasInsideSpan?(t(this.addToCartButtonSelector).first().parent().show(),t(this.addToCartButtonSelector).first().parent().removeClass("timesact-button"),t(this.addToCartButtonSelector).first().parent().removeAttr("style")):(t(this.addToCartButtonSelector).first().show(),t(this.addToCartButtonSelector).first().removeClass("timesact-button"),t(this.addToCartButtonSelector).first().removeAttr("style")),t(this.addToCartButtonSelector).val(this.addToCartText),t(this.addToCartButtonSelector).text(this.addToCartText),t(this.addToCartButtonSelector).prop("disabled",!1)}showOutOfStock(){this.hasInsideSpan?(t(this.addToCartButtonSelector).first().parent().show(),t(this.addToCartButtonSelector).first().parent().removeClass("timesact-button"),t(this.addToCartButtonSelector).first().parent().removeAttr("style")):(t(this.addToCartButtonSelector).first().show(),t(this.addToCartButtonSelector).first().removeClass("timesact-button"),t(this.addToCartButtonSelector).first().removeAttr("style")),t(this.addToCartButtonSelector).val(this.soldOutText),t(this.addToCartButtonSelector).text(this.soldOutText),t(this.addToCartButtonSelector).prop("disabled",!0)}setAddToCartText(e){this.addToCartText=e||t(this.addToCartButtonSelector).text()}setSoldOutText(t){this.soldOutText=t}hide(){t(this.button).hide()}disable(){this.hasInsideSpan?t(this.button).parent().prop("disabled",!0):t(this.button).prop("disabled",!0),t(this.addToCartButtonSelector).prop("disabled",!0)}confirmButtonExists(){return t(this.button).closest("body").length>0}identifyButton(t){this.button=t.formSelector.find(t.ids.addToCartButton)}applyStyles(e,i){t(`.${i}`).attr("style",`
width: ${e.width}px !important;
height: ${e.height}px !important;
background-color: ${e.backgroundColor} !important;
border: ${e.borderWidth}px solid ${e.borderColor} !important;
border-color: ${e.borderColor} !important;
border-radius: ${e.borderRadius}px !important;
border-width: ${e.borderWidth}px !important;
color: ${e.fontColor} !important;
font-size: ${e.fontSize}px !important;
font-style: ${e.fontStyle} !important;
font-weight: ${e.fontWeight} !important;
margin-bottom: 10px !important;
cursor: pointer;`)}}class l{constructor(t){this.locale=t}addStylePreorderMessage(e,i){t(`.timesact-${i}-description`).css({"font-size":`${e.fontSize}px`,color:e.fontColor,"text-align":e.textAlign,"font-weight":e.fontWeight,"font-style":e.fontStyle})}populateDynamicValues(t,e,i){return e=(e=(e=(e=e.replace("{{preorderQuantity}}",this.getQuantity(t,i))).replace("{{shippingDate}}",this.getShippingDate(t.config.shippingDate,i))).replace("{{daysLeftUntilShippingDate}}",this.getDaysLeftUntilShippingDate(t.config.shippingDate,i))).replace("{{daysLeftUntilPreorderEndDate}}",this.getDaysLeftUntilEndDate(t.config,i))}getQuantity(t,e){return"STOCK3"==t.config.stock.option?t.quantity:t.config.stock.hasUnlimitedQuantity?e?"VARIABLE_NOT_SET":'<span style="color:red;">VARIABLE_NOT_SET</span>':t.config.stock.quantity}getShippingDate(t,e){if(!t||"NO_SET"===t.type)return e?"VARIABLE_NOT_SET":'<span style="color:red;">VARIABLE_NOT_SET</span>';if("DATE"===t.type){let i=new Date(1e3*t.date);return i.toLocaleDateString(this.locale,{day:"numeric",month:"long",year:"numeric"})}if("PERIOD"===t.type){var s=1;switch(t.periodType){case"DAY":s=t.periodValue;break;case"WEEK":s=7*t.periodValue;break;case"MONTH":s=30*t.periodValue}var a=new Date;return a.setDate(a.getDate()+s),a.toLocaleDateString(this.locale,{day:"numeric",month:"long",year:"numeric"})}if("INTERVAL"===t.type){var o=1,r=1;switch(t.periodStart.type){case"DAY":o=t.periodStart.value;break;case"WEEK":o=7*t.periodStart.value;break;case"MONTH":o=30*t.periodStart.value}switch(t.periodEnd.type){case"DAY":r=t.periodEnd.value;break;case"WEEK":r=7*t.periodEnd.value;break;case"MONTH":r=30*t.periodEnd.value}var n=new Date;n.setDate(n.getDate()+o);var d=new Date;return d.setDate(d.getDate()+r),n.toLocaleDateString(this.locale,{day:"numeric",month:"long",year:"numeric"})+" - "+d.toLocaleDateString(this.locale,{day:"numeric",month:"long",year:"numeric"})}}getDaysLeftUntilShippingDate(t,e){if(!t||"NO_SET"===t.type)return e?"VARIABLE_NOT_SET":'<span style="color:red;">VARIABLE_NOT_SET</span>';let i=new Date;if("DATE"===t.type){let s=new Date(1e3*t.date);return Math.ceil((s.getTime()-i.getTime())/864e5)}if("PERIOD"===t.type)switch(t.periodType){case"DAY":return t.periodValue;case"WEEK":return 7*t.periodValue;case"MONTH":return 30*t.periodValue;default:return 1}if("INTERVAL"===t.type){var a=1,o=1;switch(t.periodStart.type){case"DAY":a=t.periodStart.value;break;case"WEEK":a=7*t.periodStart.value;break;case"MONTH":a=30*t.periodStart.value}switch(t.periodEnd.type){case"DAY":o=t.periodEnd.value;break;case"WEEK":o=7*t.periodEnd.value;break;case"MONTH":o=30*t.periodEnd.value}return a+" - "+o}}getDaysLeftUntilEndDate(t,e){if(!t.hasEndDate)return e?"VARIABLE_NOT_SET":'<span style="color:red;">VARIABLE_NOT_SET</span>';let i=new Date,s=new Date(1e3*t.endDate);return Math.ceil((s.getTime()-i.getTime())/864e5)}}class p{constructor(e,i,s,a){this.selectors=e,this.product=i,this.settings=window.ta.settings,this.defaultSettingIds=s,this.buttonPO=new c(this.selectors.buttonSelector,"timesact-button-po"),this.buttonBIS=new c(this.selectors.buttonSelector,"timesact-button-bis"),this.buttonCS=new c(this.selectors.buttonSelector,"timesact-button-cs"),this.uuid=Math.floor(1e8+9e8*Math.random()),t(this.selectors.variantSelector).addClass("timesact-variant-picker-"+this.uuid),this.shop=a}init(){this.createWidget(),new u().initVariantEventListener(this)}createWidget(){let e=this.product.timesactVariants[this.product.variantId];if(this.product.isBISEnabledForVariant()){let i=this.product.getVariantSettings(this.settings,this.defaultSettingIds.BIS,"BIS");this.buttonBIS.setAddToCartText(i.button.addToCartText),this.buttonBIS.setSoldOutText(i.button.soldOutText),"ACTIVE"===e.configBIS.status&&(this.buttonBIS.showBIS(i),this.addCommonElements(i,e))}if(this.product.isPOEnabledForVariant()){let s=this.product.getVariantSettings(this.settings,this.defaultSettingIds.PO,"PO");if(this.buttonPO.setAddToCartText(s.button.addToCartText),this.buttonPO.setSoldOutText(s.button.soldOutText),"NO_STOCK"===e.config.status&&(this.buttonPO.showOutOfStock(),t(this.selectors.formSelector).find(".shopify-payment-button").hide()),"ACTIVE"===e.config.status){this.buttonPO.confirmButtonExists()||(this.buttonPO.identifyButton(this.selectors),this.selectors.buttonSelector=t(this.selectors.formSelector).find(this.selectors.ids.addToCartButton)),this.buttonPO.showPO(s),this.shop.isDisabled&&this.buttonPO.disable(),this.addCommonElements(s,e);let a=new l(s.message.locale||"en-US"),o=a.populateDynamicValues(e,s.cart.labelText.key,!0),r=a.populateDynamicValues(e,s.cart.labelText.value,!0);this.showPreorderLineItemProperty(o,r),e.config.stock.hasUnlimitedQuantity||this.addQuantityListener(e.config.stock.quantity)}}if(this.product.isCSEnabledForVariant()){let n=this.product.getVariantSettings(this.settings,this.defaultSettingIds.CS,"CS");this.buttonCS.setAddToCartText(n.button.addToCartText),this.buttonCS.setSoldOutText(n.button.soldOutText),"ACTIVE"===e.configCS.status&&(this.buttonCS.showCS(n),this.addCommonElements(n,e))}}resetDefault(){this.buttonBIS.hide(),this.buttonCS.hide(),this.buttonPO.confirmButtonExists()||(this.buttonPO.identifyButton(this.selectors),this.selectors.buttonSelector=t(this.selectors.formSelector).find(this.selectors.ids.addToCartButton)),this.product.isVariantOutOfStock()?(this.buttonPO.showOutOfStock(),t(this.selectors.formSelector).find(".shopify-payment-button").hide()):(this.buttonPO.showAddToCart(),t(this.selectors.formSelector).find(".shopify-payment-button").show()),this.removePreorderLineItemProperty(),this.removePreorderMessage(),this.removePreorderBadge(),this.removePreorderQuantity(),this.selectors.hideProductElements&&this.addHiddenElements()}addCommonElements(e,i){t(this.selectors.formSelector).find(".shopify-payment-button").hide();let s="BIS"===e.type?"bis":"CS"===e.type?"cs":"preorder";this.addPreorderMessage(e.message,i,s),e.badge.product&&this.addBadge(this.selectors.badgeSelector,e.badge,s),this.selectors.hideProductElements&&t(this.selectors.hideProductElements).hide()}showPreorderLineItemProperty(e,i){0===t(this.selectors.formSelector).find("#preorder-label").length?t(this.selectors.formSelector).append('<input type="hidden" id="preorder-label" name="properties['+e+']" value="'+i+'" />'):t(this.selectors.formSelector).find("#preorder-label").val(i)}removePreorderLineItemProperty(){t(this.selectors.formSelector).find("#preorder-label").remove()}removePreorderBadge(){t(this.selectors.badgeSelector).find(".timesact-badge-ribbon-preorder, .timesact-badge-ribbon-bis, .timesact-badge-ribbon-cs").remove(),t(this.selectors.badgeSelector).find(".timesact-badge-common-preorder, .timesact-badge-common-bis, .timesact-badge-common-cs").remove()}addBadge(t,e,i){let s=new a;s.add(t,e.type,e.value,i),s.applyStyles(e,i)}addPreorderMessage(t,e,i){let s=new l(t.locale||"en-US");if(""!=t.value){let a=s.populateDynamicValues(e,t.value,!1);this.showPreorderMessage(t.type,a,i),s.addStylePreorderMessage(t,i)}}showPreorderMessage(e,i,s){if(this.selectors.messageSelector){0===t(this.selectors.formSelector).find(`.timesact-${s}-description`).length?"BELOW"===e?t(this.selectors.messageSelector).after(`<div class='timesact-${s}-description'>`+i+"</div>"):t(this.selectors.messageSelector).before(`<div class='timesact-${s}-description'>`+i+"</div>"):t(this.selectors.formSelector).find(`.timesact-${s}-description`).val(i);return}0===t(this.selectors.formSelector).find(`.timesact-${s}-description`).length?"BELOW"===e?t(this.selectors.buttonSelector).after(`<div class='timesact-${s}-description'>`+i+"</div>"):t(this.selectors.buttonSelector).before(`<div class='timesact-${s}-description'>`+i+"</div>"):t(this.selectors.formSelector).find(`.timesact-${s}-description`).val(i)}removePreorderMessage(){t(this.selectors.formSelector).find(".timesact-preorder-description, .timesact-bis-description, .timesact-cs-description").remove()}removePreorderQuantity(){t(".timesact-quantity-message").remove(),t(this.selectors.quantitySelector).off("change.quantityChange"),t(this.selectors.buttonSelector).off("click.quantityButtonClick")}addHiddenElements(){t(this.selectors.hideProductElements).show()}addQuantityListener(e){let i=this.selectors;t(this.selectors.quantitySelector).on("change.quantityChange",function(){e<parseInt(t(this).val())?(t(".timesact-quantity-message").length||(i.messageSelector?t(i.messageSelector).before(`<div class='timesact-quantity-message' style='color:red'>You can only pre-order ${e} items!</div>`):t(i.buttonSelector).before(`<div class='timesact-quantity-message' style='color:red'>You can only pre-order ${e} items!</div>`)),t(i.buttonSelector).prop("disabled",!0)):(t(".timesact-quantity-message").remove(),t(i.buttonSelector).prop("disabled",!1))}),t(this.selectors.buttonSelector).on("click.quantityButtonClick",function(s){let a=t(i.quantitySelector).val();e<parseInt(a)?(s.preventDefault(),t(".timesact-quantity-message").length||(i.messageSelector?t(i.messageSelector).before(`<div class='timesact-quantity-message' style='color:red'>You can only pre-order ${e} items!</div>`):t(i.buttonSelector).before(`<div class='timesact-quantity-message' style='color:red'>You can only pre-order ${e} items!</div>`))):t(".timesact-quantity-message").remove()})}}class u{initVariantEventListener(e){var i=this;t(document).on("change",".timesact-variant-picker-"+e.uuid,function(t){i.variantChangeHandler(e)}),i.setup(function(){i.variantChangeHandler(e)})}sleep(t){return new Promise(function(e){setTimeout(e,t)})}variantChangeHandler(e){let i=e;this.sleep(e.selectors.variantChangingTime).then(function(){var e=window.location.search.replace(/.*variant=(\d+).*/,"$1");e||(e="radio"===t(i.selectors.formSelector).find("select[name='id'], input[name='id'], select[name='id[]'], input[name='id[]']").attr("type")?t(i.selectors.formSelector).find("input[name='id']:checked, input[name='id[]']:checked").val():t(i.selectors.formSelector).find("select[name='id'], input[name='id'], select[name='id[]'], input[name='id[]']").val()),i.product.setActiveVariant(e),i.resetDefault(),i.createWidget()})}track(t,e,i){return function s(){if(i)return e.apply(this,arguments),t.apply(this,arguments);var a=t.apply(this,arguments);return e.apply(this,arguments),a}}setup(t){history.pushState=this.track(history.pushState,t),history.replaceState=this.track(history.replaceState,t),window.addEventListener("popstate",t)}}class m{static async createSubscription(e){try{return await t.ajax({url:"/apps/timesact/notifications/bis",type:"POST",contentType:"application/json; charset=utf-8",dataType:"json",data:JSON.stringify(e)}),!0}catch(i){return console.log("Subscription no create",i),!1}}static async getProductPreOrderConfig(e){try{return await t.ajax({url:`/apps/timesact/config?productId=${e}`,type:"GET",contentType:"application/json; charset=utf-8",dataType:"json"})}catch(i){return console.log("Product is not active on pre-order."),null}}async getProducts(e=[]){try{return await t.ajax({url:`/apps/timesact/products?productIds=${e}`,type:"GET",contentType:"application/json; charset=utf-8",dataType:"json"})}catch(i){return console.log("Products config couldn't be fetched."),null}}async getShop(){try{return await t.ajax({url:"/apps/timesact/shop",type:"GET",contentType:"application/json; charset=utf-8",dataType:"json"})}catch(e){return console.log("Shop data couldn't be fetched."),null}}async getSettings(){try{return await t.ajax({url:"/apps/timesact/shop/settings",type:"GET",contentType:"application/json; charset=utf-8",dataType:"json"})}catch(e){return console.log("Settings data couldn't be fetched."),null}}}class h{constructor(t){this.ids=t}setNormalSelectors(){this.formSelector=t(this.ids.form),this.buttonSelector=this.formSelector.find(this.ids.addToCartButton),0===this.buttonSelector.length&&(this.buttonSelector=this.formSelector.find('[type="submit"]:visible:first, [name="add"], .product-submit, .addtocart-button-active, .product-form--add-to-cart, .button--addToCart, .product-form__submit, .add-to-cart, .btn-addtocart, .single_add_to_cart_button, .product-form__cart-submit, .product-form--atc-button, .ProductForm__AddToCart, [type="button"]:visible:first').first()),this.variantSelector=this.formSelector.find(this.ids.variant),this.ids.quantity?this.quantitySelector=this.formSelector.find(this.ids.quantity):(this.quantitySelector=this.formSelector.find('[name="quantity"]'),0===this.quantitySelector.length&&(this.quantitySelector=t('[name="quantity"]'))),this.ids.badge?this.badgeSelector=t(this.ids.badge):this.badgeSelector=t(".timesact-badge"),this.ids.message&&(this.messageSelector=this.formSelector.find(this.ids.message)),this.ids.hide&&this.ids.hide.product&&(this.hideProductElements=this.ids.hide.product),this.variantChangingTime=this.ids.variantChangingTime||250,this.formSelector.find('[data-pf-type="ProductATC"], [data-pf-type="ProductATC2"]').length>0&&(this.buttonSelector=this.formSelector.find('[data-pf-type="ProductATC"] span:first, [data-pf-type="ProductATC2"] span:first'),this.messageSelector=this.formSelector.find('[data-pf-type="Timesact"]'),this.badgeSelector=t('[data-pf-type="MainMedia"]'))}setQuickViewSelectors(){this.formSelector=t(window.ta.quickView.selectors.quickviewModalContainer).find(window.ta.quickView.selectors.form),this.buttonSelector=t(window.ta.quickView.selectors.quickviewModalContainer).find(window.ta.quickView.selectors.addToCartButton),this.variantSelector=t(window.ta.quickView.selectors.quickviewModalContainer).find(window.ta.quickView.selectors.variant),this.quantitySelector=t(window.ta.quickView.selectors.quickviewModalContainer).find(window.ta.quickView.selectors.quantity),this.ids.message&&(this.messageSelector=this.formSelector.find(this.ids.message)),this.variantChangingTime=this.ids.variantChangingTime||250,this.ids.badge?this.badgeSelector=t(this.ids.badge):this.badgeSelector=t(".timesact-badge")}}class b{constructor(t,e){this.shop=t,this.product=e}async run(t){let e=await m.getProductPreOrderConfig(this.product.id);if(!e){window.ta.products[this.product.id]={isPreorder:!1,isBIS:!1,isCS:!1,lastUpdate:parseInt(new Date().getTime()/1e3)},localStorage.setItem("products",JSON.stringify(window.ta.products));return}window.ta.currentTimesactProductData={defaultSettings:this.shop.settings,productId:this.product.id,productName:this.product.title,productVariants:e.product.variants,variantId:null},this.selectors=new h(this.shop.selectors),t?this.selectors.setQuickViewSelectors():this.selectors.setNormalSelectors(),this.product.setActiveVariant(new n().extractVariantId(this.product.variants,this.selectors.formSelector)),this.product.setTimesactVariants(e.product);let i=new p(this.selectors,this.product,this.shop.settings.templates,this.shop);i.init(),window.ta.products[this.product.id]={isPreorder:this.isActiveOnPreorder(e.product.variants),isBIS:this.isActiveOnBIS(e.product.variants),isCS:this.isActiveOnCS(e.product.variants),variants:e.product.variants,lastUpdate:parseInt(new Date().getTime()/1e3)},localStorage.setItem("products",JSON.stringify(window.ta.products))}async runCollection(){if(window.ta.settings[this.shop.settings.templates.PO].badge.collection||window.ta.settings[this.shop.settings.templates.BIS].badge.collection||window.ta.settings[this.shop.settings.templates.CS].badge.collection){this.shop.lastProductUpdate&&window.ta.lastProductUpdate<this.shop.lastProductUpdate&&(window.ta.products={});let e=[".timesact-badge",".product-item",".card--standard",".card--card",".ProductItem",'[data-pf-type="ProductBox"]'];this.shop.selectors.collection&&this.shop.selectors.collection.badge&&(e=[this.shop.selectors.collection.badge]);let i=[];for(let s=0;s<e.length;s++)if(t(e[s]).length>0){i=t(e[s]);break}this.enableBadgeOnCollection(i)}}async runMixedCartAlert(t){if(!window.ta.cart.showMixedCartAlert||!t.items.length)return;let e=window.ta.settings[this.shop.settings.templates.PO];if(!e.cart.mixed.isEnabled)return;let i=!1,s=!1,a={};for(var r of t.items){if(window.ta.products[r.product_id]){if(window.ta.products[r.product_id].variants&&window.ta.products[r.product_id].variants[r.variant_id]&&"ACTIVE"===window.ta.products[r.product_id].variants[r.variant_id].config.status){i=!0;continue}s=!0;continue}a[r.product_id]=a[r.product_id]||[],a[r.product_id].push(r.variant_id)}let n=new o;if(i&&s){n.display(e.cart.mixed);return}if(!Object.keys(a).length)return;let d=await new m().getProducts(Object.keys(a));if(!d){console.log("[Error] Timesact API getProducts.");return}for(let c of Object.keys(a)){if(!(c in d.products)){s=!0,window.ta.products[c]={isPreorder:!1,isBIS:!1,isCS:!1,lastUpdate:parseInt(new Date().getTime()/1e3)};continue}for(let l of a[c]){if(d.products[c].variants[l]&&"ACTIVE"===d.products[c].variants[l].config.status){i=!0;continue}s=!0}if(window.ta.products[c]={isPreorder:this.isActiveOnPreorder(d.products[c].variants),isBIS:this.isActiveOnBIS(d.products[c].variants),isCS:this.isActiveOnCS(d.products[c].variants),variants:d.products[c].variants,lastUpdate:parseInt(new Date().getTime()/1e3)},s&&i){n.display(e.cart.mixed);break}}localStorage.setItem("products",JSON.stringify(window.ta.products))}isActiveOnPreorder(t){return Object.values(t).every(t=>"ACTIVE"===t.config.status)}isActiveOnBIS(t){return Object.values(t).every(t=>t.configBIS&&"ACTIVE"===t.configBIS.status)}isActiveOnCS(t){return Object.values(t).every(t=>t.configCS&&"ACTIVE"===t.configCS.status)}async enableBadgeOnCollection(e){if(0===e.length){console.log("No items detected.");return}let i={},s=window.ta.settings[this.shop.settings.templates.PO],a=window.ta.settings[this.shop.settings.templates.BIS],o=window.ta.settings[this.shop.settings.templates.CS];await Promise.all(Array.from(e).map(async e=>{var r;if(t(e).data("product-id"))r=t(e).data("product-id");else{let n=t(e).find("a").attr("href");if(!n)return;let d=n.split("/").pop().split("?")[0];if(!d)return;console.log("Product handle: ",d);let c=await t.getJSON(window.location.origin+n);if(!c||!c.product||!c.product.id)return;r=String(c.product.id)}if(window.ta.products[r]){let l=!1;window.ta.products[r].isPreorder&&s.badge.collection&&(this.addBadge(e,s.badge,"preorder"),l=!0,s.button.collection&&s.button.collection.isEnabled&&this.enableButtonOnCollection(e,this.shop,window.ta.products[r],s)),window.ta.products[r].isBIS&&a.badge.collection&&(this.addBadge(e,a.badge,"bis"),l=!0),window.ta.products[r].isCS&&o.badge.collection&&(this.addBadge(e,o.badge,"cs"),l=!0),l&&this.shop.selectors.hide&&this.shop.selectors.hide.collection&&t(e).find(this.shop.selectors.hide.collection).hide();return}i[r]=e}));let r=await new m().getProducts(Object.keys(i));if(!r){console.log("[Error] Timesact API getProducts.");return}for(let[n,d]of Object.entries(i)){if(!(n in r.products)){window.ta.products[n]={isPreorder:!1,isBIS:!1,isCS:!1,lastUpdate:parseInt(new Date().getTime()/1e3)};continue}let c=this.isActiveOnPreorder(r.products[n].variants),l=this.isActiveOnBIS(r.products[n].variants),p=this.isActiveOnCS(r.products[n].variants),u=!1;c&&s.badge.collection&&(this.addBadge(d,s.badge,"preorder"),u=!0,s.button.collection&&s.button.collection.isEnabled&&this.enableButtonOnCollection(d,this.shop,r.products[n],s)),l&&a.badge.collection&&(this.addBadge(d,a.badge,"bis"),u=!0),p&&o.badge.collection&&(this.addBadge(d,o.badge,"cs"),u=!0),u&&this.shop.selectors.hide&&this.shop.selectors.hide.collection&&t(d).find(this.shop.selectors.hide.collection).hide(),window.ta.products[n]={isPreorder:c,isBIS:l,isCS:p,variants:r.products[n].variants,lastUpdate:parseInt(new Date().getTime()/1e3)}}localStorage.setItem("products",JSON.stringify(window.ta.products))}enableButtonOnCollection(e,i,s,a){let o='form[action="/cart/add"]';i.selectors.collection&&i.selectors.collection.form&&(o=i.selectors.collection.form);let r='[type=submit]:visible:first, [data-pf-type="ProductATC"] span:first, [data-pf-type="ProductATC2"] span:first';i.selectors.collection&&i.selectors.collection.addToCartButton&&(r=i.selectors.collection.addToCartButton);let n=t(e).find(o);for(let d in s.variants)if("ACTIVE"===s.variants[d].config.status){let c=t(e).find(r),p=window.ta.settings[s.variants[d].config.settingsTemplate]?window.ta.settings[s.variants[d].config.settingsTemplate].button.name:a.button.name;t(c).val(p),t(c).text(p),t(c).prop("disabled",!1),t(e).find(".shopify-payment-button").hide();let u=new l(a.message.locale||"en-US"),m=window.ta.settings[s.variants[d].config.settingsTemplate]?window.ta.settings[s.variants[d].config.settingsTemplate].cart.labelText.value:a.cart.labelText.value,h=window.ta.settings[s.variants[d].config.settingsTemplate]?window.ta.settings[s.variants[d].config.settingsTemplate].cart.labelText.key:a.cart.labelText.key;h=u.populateDynamicValues(s.variants[d],h,!0),m=u.populateDynamicValues(s.variants[d],m,!0),0===t(n).find("#preorder-label").length?t(n).append('<input type="hidden" id="preorder-label" name="properties['+h+']" value="'+m+'" />'):t(n).find("#preorder-label").val(m)}}addBadge(e,i,s){t(e).find('[data-pf-type="ProductMedia"], [data-pf-type="ProductMedia2"]').length>0&&(e=t(e).find('[data-pf-type="ProductMedia"], [data-pf-type="ProductMedia2"]'));let o=new a;o.add(e,i.type,i.value,s),o.applyStyles(i,s)}}let g=new m,f=new class e{constructor(){}initTimesact(){if(void 0!==window.ta)return;let t=localStorage.getItem("products")?JSON.parse(localStorage.getItem("products")):{},e=localStorage.getItem("settings")?JSON.parse(localStorage.getItem("settings")):void 0,i=this.computeLastProductUpdate(t),s=localStorage.getItem("lastSettingsUpdate")?JSON.parse(localStorage.getItem("lastSettingsUpdate")):0;window.ta={products:t,settings:e,lastProductUpdate:i,lastSettingsUpdate:s,cart:{showMixedCartAlert:!localStorage.getItem("showCartMixedAlert")||JSON.parse(localStorage.getItem("showCartMixedAlert"))},quickView:{selectors:{button:".quick-add__submit, .productitem--action-qs, .boost-pfs-quickview-btn, .cc-quick-buy-btn, .button--quick-shop, .sca-qv-button, .quick-view-btn, .bc-quickview-btn-wrapper, .sca-qv-cartbtn, .js-quick-shop-link, .searchit-quick-view-button, .quick-view, .js-quickbuy-button, .quick-product__btn, .product-card-interaction-quickshop, .product-modal, .productitem--action button, a.quickview, .overlay, a.quickview, .has-quick-view .btn .v-b, .shop-now-button, .quick-buy, .quick_shop, a[data-action='show-product'], .trigger-quick-view, .quickview-button, .quick_view, .qview-button, button.btn-addToCart:last, .quick-shop, .fancybox.ajax, .quick-add-button-variants, .product-thumbnail__quickshop-button, .js-quickView-button",form:`.product__form:visible,
    #sca-qv-add-item-form:visible,
    .shopify-product-form:visible,
    .bc-modal-wrapper:visible
    #bc-quickview-cart-form:visible,
    .product_form:visible,
    .searchit-quick-view-form-wrapper
    form:visible, .product-form:visible,
    .quick-buy__product-form:visible,
    .product-single__form:visible,
    form[action='/cart/add']:visible,
    #AddToCartForm:visible,
    form.module:visible,
    #add-to-cart-quickview-form:visible`,addToCartButton:"[type=submit]:visible:first span, .sca-qv-cartbtn:visible, #addToCart:visible, #bc-quickview-cart-btn:visible, .add_to_cart:visible, #searchit-quick-view-add-to-cart:visible, .product-form__cart-submit:visible, .quickbuy__submit:visible, .add-to-cart:visible, .product-submit:visible, .add:visible, .product-form--atc-button:visible, input.action-button.submit:visible, .addto.cart.sliding-cart:visible, #AddToCart:visible, .product-add:visible, .add-to-cart:visible, .product__submit__add:visible, .product-add-to-cart:visible, #add-to-cart:visible, .product-submit.action-button.product-submit, .product-form__add-button:visible, .add-to-cart-btn:visible, .qview-btn-addtocart:visible, button.btn-addToCart:last, .button--add-to-cart:visible",variant:"#sca-qv-variant-options select.single-option-selector, .bc-quickview-single-option-selector, .searchit-option-selector-wrapper select, .qview-variants select, select:visible, .radio-wrapper fieldset, input[type='radio']",quantity:"[name='quantity']",quickviewModalContainer:".quick-add-modal, .theme-modal--quickbuy, .quickview-product .product-quickview:visible, .sca-fancybox-wrap:visible, .mfp-container:visible, .bc-modal-wrapper:visible, .quick-shop:visible, .searchit-modal:visible, #colorbox:visible, .modal--quick-shop:visible, .quickshop:visible, .fancybox-wrap:visible, .fancybox-container:visible, .modal-content:visible, .product-quick-view, section.quick-view, #ShopNowContainer, #ProductScreens, .product.preview, .modal__inner__wrapper:visible, .halo-modal-content:visible, #quickView:visible, .quickshop-content:visible, .modal__inner:visible, .quick-view .content:visible, .qview-product:visible"}}}}computeLastProductUpdate(t){let e=parseInt(new Date().getTime()/1e3);for(let i of Object.values(t)){if(i.lastUpdate&&i.lastUpdate<e){e=i.lastUpdate;continue}i.lastUpdate||(e=1)}return e}isProductPage(){return -1<window.location.href.indexOf("/products/")||-1<window.location.href.indexOf("/products_preview?")}isCollectionPage(){return -1<window.location.href.indexOf("/collections/")}isSearchPage(){return -1<window.location.href.indexOf("/search?")}isPagesPage(){return -1<window.location.href.indexOf("/pages/")}isHomePage(){return"/"===document.location.pathname}isCartPage(){return -1<window.location.pathname.indexOf("/cart")}initQuickView(t){this.shopData=t,this.createQuickViewButtonListener()}createQuickViewButtonListener(){var e=this;t(window.ta.quickView.selectors.button).click(function(i){var s;let a=e.getProductHandle(i.currentTarget);if(!a)return;let o=e.getProductPageJsURL(a);t.getJSON(o,function(t){s=new r(t.product.id,t.product.variants)}).done(function(){new b(e.shopData,s).run(!0)}).fail(function(){console.log("[Error 1001]: Product could not be fetched.")})})}getProductHandle(e){return t(e).data("product-url").split("/").pop()}getProductPageJsURL(t){return"https://"+window.location.hostname+"/products/"+t}sleep(t){return new Promise(function(e){setTimeout(e,t)})}cleanupModal(){t(window.ta.quickView.selectors.quickviewModalContainer).find("#preorder-label").remove(),t(window.ta.quickView.selectors.quickviewModalContainer).find(".timesact-preorder-description").remove()}};d.createListeners(),f.initTimesact();let v=await g.getShop();document.querySelector("body").addEventListener("timesAct",t=>{t.preventDefault(),console.log("inside time"),fetch(t.detail.handle+".js").then(t=>t.json()).then(t=>{let e=new r(t.id,t.variants,t.title);return e}).then(t=>{new b(v,t).run(!1)}).catch(t=>{console.error("Error:",t)})}),t(document).ready(async function(){if(!window.ta.settings||v.lastSettingsUpdate&&window.ta.lastSettingsUpdate<v.lastSettingsUpdate){let{settings:e}=await g.getSettings();window.ta.settings=e,window.ta.lastSettingsUpdate=v.lastSettingsUpdate||parseInt(new Date().getTime()/1e3),localStorage.setItem("settings",JSON.stringify(window.ta.settings)),localStorage.setItem("lastSettingsUpdate",JSON.stringify(window.ta.lastSettingsUpdate))}if(f.isProductPage()||f.isSearchPage()||f.isPagesPage()||f.isHomePage()||f.isCartPage()){if(f.isProductPage()){let i={};t.getJSON(window.location.href,function(t){i=new r(t.product.id,t.product.variants,t.product.title)}).done(function(){new b(v,i).run(!1)}).fail(function(){console.log("[Error 1001]: Product could not be fetched.")})}(f.isCollectionPage()||f.isHomePage()||f.isSearchPage()||f.isPagesPage())&&(f.initQuickView(v),new b(v).runCollection()),f.isCartPage()&&t.getJSON(window.location.href,function(t){new b(v).runMixedCartAlert(t)}).fail(function(){console.log("[Error 1001]: Product could not be fetched.")})}})},"undefined"==typeof jQuery||100>parseFloat(jQuery.fn.jquery)?function(t,e){let i=document.createElement("script");i.type="text/javascript",i.readyState?i.onreadystatechange=function(){("loaded"===i.readyState||"complete"===i.readyState)&&(i.onreadystatechange=null,e())}:i.onload=function(){e()},i.src=t,document.getElementsByTagName("head")[0].appendChild(i)}("https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js",function(){timesactScriptNew(jQuery191=jQuery.noConflict(!0))}):timesactScriptNew(jQuery);