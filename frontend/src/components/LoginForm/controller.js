import $ from 'jquery';

export default {

    data() {
        return {
            form: { email: '', senha: '' },
            alertHTML: ''
        }
    },

    methods: {

        changeValue(e) {
            this.form[e.target.id] = e.target.value;
        },

        login(e) {

            e.preventDefault();

            if (!this.checkForm()) {
                return false;
            }

            this.logIn(this.form.email, this.form.senha).then((resp) => {
                if (!resp) {
                    this.form = { email: '', senha: '' }
                    this.alertHTML = this.createWarning('danger', 'E-mail ou senha incorreta.');
                    $('#email').focus();
                }
            })

        },

        checkForm() {
            if (this.form.email === '') {
                this.alertHTML = this.createWarning('warning', 'Preencha corretamente o campo "email".');
                $('#email').focus();
                return false;
            }

            if (this.form.senha === '') {
                this.alertHTML = this.createWarning('warning', 'Preencha corretamente o campo "senha".');
                $('#senha').focus();
                return false;
            }

            return true;
        },

        createWarning(type = 'secondary', text = 'undefined') {

            let html = (<div class={`alert alert-${type}`} role="alert">
                {text}
            </div>);

            return html;

        }

    }

}
