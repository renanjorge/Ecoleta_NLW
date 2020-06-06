import Knex from 'knex';

export async function seed(knex: Knex){
    await knex('items').insert([
        {
            title: 'Lâmpadas',
            icon: 'lampadas.svg'
        },
        {
            title: 'Pilhas e Baterias',
            icon: 'baterias.svg'
        },
        {
            title: 'Papéis e Papelão',
            icon: 'papeis-papelao.svg'
        },
        {
            title: 'Resíduos Eletrônicos',
            icon: 'eletronicos.svg'
        },
        {
            title: 'Resíduos Orgânicos',
            icon: 'organicos.svg'
        },
        {
            title: 'Óleo de Cozinha',
            icon: 'oleo.svg'
        }
    ]);
}