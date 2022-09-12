<?php

namespace App\Form;

use App\Entity\Todo;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

class TodoType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('task', TextType::class, [
                'constraints' => [
                    new NotBlank(["message" => "Task name cannot be blank !"]),
                    new Length([
                        "min" => 1,
                        "max" => 20,
                        "minMessage" => "Enter at least 1 character!",
                        "maxMessage" => "You entered {{ value }}. Cannot enter more than {{ limit }} characters"
                    ])
                ]
            ])
            ->add('description', TextareaType::class, [
                "constraints" => [
                    new NotBlank(["message" => "Description cannot be blank !"]),
                    new Length([
                        "min" => 1,
                        "max" => 500,
                        "minMessage" => "Enter at least 1 character!",
                        "maxMessage" => "You entered {{ value }} characters. Cannot enter more than {{limit}} characters"
                    ])
                ]
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Todo::class,
            'csrf_protection' => false,
        ]);
    }
}
