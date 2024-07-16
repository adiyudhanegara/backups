<?php namespace JanVince\SmallContactForm\Factories;

// plugins/yourvendor/yourplugin/factories/YourModelFactory.php
use JanVince\SmallContactForm\Models\Settings;
use \OFFLINE\Seeder\Classes\Factory;

class SettingsFactory extends Factory
{
    /**
     * Default model attributes.
     */
    public function definition()
    {
        return [
            ## FORM
            "form_css_class"                      => "contact-form row",
            "form_success_msg"                    => "contactForm.success",
            "form_error_msg"                      => "contactForm.failed",
            "form_hide_after_success"             => "0",
            "form_hide_after_success_visually"    => "0",
            "form_use_placeholders"               => "1",
            "form_disable_browser_validation"     => "1",
            "form_allow_ajax"                     => "0",
            "form_disable_plain_post"             => "0",
            "form_allow_confirm_msg"              => "0",
            "form_send_confirm_msg"               => "",
            "add_assets"                          => "0",
            "add_css_assets"                      => "0",
            "add_js_assets"                       => "0",
            "form_notes"                          => "Contact us form default template.",
    
            ## BUTTONS
            "send_btn_wrapper_css"     => "text-center",
            "send_btn_css_class"       => "btn btn-primary btn-xl text-uppercase",
            "send_btn_text"            => "contactForm.submit",
            "allow_redirect"           => "0",
            "redirect_url"             => "",
            "redirect_url_external"    => "0",

            ## FORM FIELDS
            "form_fields" => [
                // Name
                [
                    "label" => "contactForm.name1",
                    "name" => "name",
                    "type" => "text",
                    "wrapper_css" => "col-md-6 form-group",
                    "field_custom_code" => "",
                    "field_custom_code_twig" => "0",
                    "field_custom_content" => "\n",
                    "field_styling" => "1",
                    "autofocus" => "0",
                    "label_css" => "label",
                    "field_css" => "form-control",
                    "field_validation" => "1",
                    "validation" => [
                        [
                            "validation_type" => "required",
                            "validation_error" => "contactForm.name1.required_validate",
                            "validation_custom_type" => "",
                            "validation_custom_pattern" => ""
                        ],
                    ]
                ],
                // Phone
                [
                    "label" => "contactForm.phone",
                    "name" => "phone",
                    "type" => "tel",
                    "wrapper_css" => "col-md-6 form-group",
                    "field_custom_code" => "",
                    "field_custom_code_twig" => "0",
                    "field_custom_content" => "\n",
                    "field_styling" => "1",
                    "autofocus" => "0",
                    "label_css" => "label",
                    "field_css" => "form-control",
                    "field_validation" => "1",
                    "validation" => [
                        [
                            "validation_type" => "required",
                            "validation_error" => "contactForm.phone.required_validate",
                            "validation_custom_type" => "",
                            "validation_custom_pattern" => ""
                        ],
                    ]
                ],
                // Email
                [
                    "label" => "contactForm.email",
                    "name" => "email",
                    "type" => "email",
                    "wrapper_css" => "col-md-6 form-group",
                    "field_custom_code" => "",
                    "field_custom_code_twig" => "0",
                    "field_custom_content" => "\n",
                    "field_styling" => "1",
                    "autofocus" => "0",
                    "label_css" => "label",
                    "field_css" => "form-control",
                    "field_validation" => "1",
                    "validation" => [
                        [
                            "validation_type" => "required",
                            "validation_error" => "contactForm.email.required_validate",
                            "validation_custom_type" => "",
                            "validation_custom_pattern" => ""
                        ],
                        [
                            "validation_type" => "email",
                            "validation_error" => "contactForm.email.required_email",
                            "validation_custom_type" => "",
                            "validation_custom_pattern" => ""
                        ],
                    ]
                ],
                [
                    "label" => "contactForm.attachemnt",
                    "name" => "attachemnt",
                    "type" => "file",
                    "wrapper_css" => "col-md-6 form-group",
                    "field_custom_code" => "",
                    "field_custom_code_twig" => "0",
                    "field_custom_content" => "\n",
                    "field_styling" => "1",
                    "autofocus" => "0",
                    "label_css" => "label",
                    "field_css" => "form-control",
                    "field_validation" => "0",
                ],
                [
                    "label" => "contactForm.message",
                    "name" => "message",
                    "type" => "textarea",
                    "wrapper_css" => "col-md-12 form-group",
                    "field_custom_code" => "",
                    "field_custom_code_twig" => "0",
                    "field_custom_content" => "\n",
                    "field_styling" => "1",
                    "autofocus" => "0",
                    "label_css" => "label",
                    "field_css" => "form-control",
                    "field_validation" => "0",
                ],
            ],

            "autoreply_email_field" => "",
            "autoreply_name_field" => "",
            "autoreply_message_field" => "",
            "add_google_recaptcha" => "0",
            "google_recaptcha_version" => "v2checkbox",
            "google_recaptcha_site_key" => "",
            "google_recaptcha_secret_key" => "",
            "google_recaptcha_error_msg" => "",
            "google_recaptcha_wrapper_css" => "",
            "google_recaptcha_scripts_allow" => "0",
            "google_recaptcha_locale_allow" => "0",
            "add_antispam" => "0",
            "antispam_delay" => null,
            "antispam_delay_error_msg" => "",
            "antispam_label" => "",
            "antispam_error_msg" => "",
            "add_ip_protection" => "0",
            "add_ip_protection_count" => null,
            "add_ip_protection_error_too_many_submits" => "",
            "allow_email_queue" => "0",
            "allow_autoreply" => "0",
            "email_address_from" => "",
            "email_address_from_name" => "",
            "email_address_replyto" => "",
            "email_subject" => "",
            "email_template" => "",
            "allow_notifications" => "0",
            "notification_address_from_form" => "0",
            "notification_address_to" => "",
            "notification_template" => "",
            "ga_success_event_allow" => "0",
            "ga_success_event_gtag" => "",
            "ga_success_event_category" => "",
            "ga_success_event_action" => "",
            "ga_success_event_label" => "",
            "privacy_disable_messages_saving" => "0",
        ];
    }

    /**
     * Define states: Override attributes that differ from the default definition.
     * Use it like this: YourModel::factory()->withHigherNumber()->make();
     */
    public function withHigherNumber()
    {
        return $this->states(function(array $attributes) {
            return [
                'number' => fake()->numberBetween(100, 900)
            ];
        });
    }
}
