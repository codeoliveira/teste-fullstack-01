import $ from 'jquery';
import './form.style.scss';

export default {


    data() {
        return {
            form: {},
            extras: {}
        }
    },



    methods: {

        // 
        changeValue(e) {
            this.form[e.target.id] = e.target.value;
        },


        // 
        createWarning(type = 'secondary', text = 'undefined') {

            let html = (<div class={`alert alert-${type}`} role="alert">
                {text}
            </div>);

            return html;

        },


        createNotification(type = '', title = 'undefined', text = 'undefined', delay = 4000) {

            let html = `
                <div class="toast-custom ${type}" >
                    <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                        <div class="toast-header">
                            <i class="icon fa fa-warning"></i>
                            <strong class="mr-auto">${title}</strong>
                            <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="toast-body">
                            ${text}
                        </div>
                    </div>
                </div >
            `;


            $('#extras').html(html);
            $('.toast').toast({ animation: true, autohide: true, delay: delay });
            $('.toast').toast('show');

            return html;

        },




        async createModal(title = 'undefined', body = 'undefined', footer = '') {

            let id = `form-modal-${Math.floor(Math.random() * 1000)}`;

            let html = await (
                <div class="modal fade" id={`${id}`} ref={`${id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">{title}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body col-lg-12">
                                {body}
                            </div>
                            <div class="modal-footer">
                                {footer}
                            </div>
                        </div>
                    </div>
                </div>
            );

            this.extras = html;
            // $('#extras').html(html);
            return id;


        }
    }



}