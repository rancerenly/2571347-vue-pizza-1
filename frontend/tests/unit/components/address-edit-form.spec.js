import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import AddressEditForm from "@/common/components/address/AddressEditForm.vue";

describe('AddressEditForm.vue', () => {

    it('Проверка, что форма вызывает событие delete при нажатии кнопки удаления', async () => {
        const deleteSpy = vi.fn();
        const wrapper = mount(AddressEditForm, {
            props: {
                title: 'Редактировать адрес',
            },
            emits: ['delete'],
        });

        await wrapper.find('button.button--transparent').trigger('click');

        expect(deleteSpy).not.toHaveBeenCalled();
        expect(wrapper.emitted().delete).toBeTruthy();
    });

    it('Проверка, что данные формы инициализируются с пропса address', async () => {
        const addressData = {
            name: 'Адрес 1',
            street: 'Улица 1',
            building: '1',
            flat: '101',
            comment: 'Комментарий',
        };

        const wrapper = mount(AddressEditForm, {
            props: {
                address: addressData,
                title: 'Редактировать адрес',
            },
        });

        expect(wrapper.find('input[name="addr-name"]').element.value).toBe(addressData.name);
        expect(wrapper.find('input[name="addr-street"]').element.value).toBe(addressData.street);
        expect(wrapper.find('input[name="addr-house"]').element.value).toBe(addressData.building);
        expect(wrapper.find('input[name="addr-apartment"]').element.value).toBe(addressData.flat);
        expect(wrapper.find('input[name="addr-comment"]').element.value).toBe(addressData.comment);
    });
});
