import { setActivePinia, createPinia } from 'pinia';
import { usePizzaStore } from '@/stores/pizzaStore';
import { useDataStore } from '@/stores/dataStore';
import { vi } from 'vitest';

describe('pizzaStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    describe('getter: sauce', () => {
        it('Проверка, что геттер sauce возвращает соус по ID', () => {
            const pizzaStore = usePizzaStore();
            pizzaStore.sauceId = 1;

            const mockSauces = [{ id: 1, name: 'Tomato' }, { id: 2, name: 'Barbecue' }];
            vi.spyOn(useDataStore(), 'sauces', 'get').mockReturnValue(mockSauces);

            const result = pizzaStore.sauce;
            expect(result).toEqual(mockSauces[0]);
        });

        it('Проверка, что геттер sauce возвращает первый соус, если с таким ID не найдено', () => {
            const pizzaStore = usePizzaStore();
            pizzaStore.sauceId = 999;

            const mockSauces = [{ id: 1, name: 'Tomato' }, { id: 2, name: 'Barbecue' }];
            vi.spyOn(useDataStore(), 'sauces', 'get').mockReturnValue(mockSauces);

            const result = pizzaStore.sauce;
            expect(result).toEqual(mockSauces[0]);
        });
    });

    describe('getter: dough', () => {
        it('Проверка, что геттер dough возвращает тесто по ID', () => {
            const pizzaStore = usePizzaStore();
            pizzaStore.doughId = 2;

            const mockDoughs = [{ id: 1, name: 'Thin' }, { id: 2, name: 'Thick' }];
            vi.spyOn(useDataStore(), 'doughs', 'get').mockReturnValue(mockDoughs);

            const result = pizzaStore.dough;
            expect(result).toEqual(mockDoughs[1]);
        });
    });

    describe('getter: ingredientsExtended', () => {
        it('Проверка, что геттер ingredientsExtended возвращает расширенную информацию о ингредиентах', () => {
            const pizzaStore = usePizzaStore();
            pizzaStore.ingredients = [{ ingredientId: 1, quantity: 2 }, { ingredientId: 2, quantity: 1 }];

            // Моки для ингредиентов
            const mockIngredients = [
                { id: 1, name: 'Cheese' },
                { id: 2, name: 'Pepperoni' },
            ];
            vi.spyOn(useDataStore(), 'ingredients', 'get').mockReturnValue(mockIngredients);

            const result = pizzaStore.ingredientsExtended;
            expect(result).toEqual([
                { id: 1, name: 'Cheese', quantity: 2 },
                { id: 2, name: 'Pepperoni', quantity: 1 },
            ]);
        });
    });


    describe('action: addIngredient', () => {
        it('Проверка, что действие addIngredient добавляет ингредиент в список', () => {
            const pizzaStore = usePizzaStore();
            pizzaStore.addIngredient(1);

            expect(pizzaStore.ingredients).toEqual([{ ingredientId: 1, quantity: 1 }]);
        });
    });

    describe('action: incrementIngredientQuantity', () => {
        it('Проверка, что действие incrementIngredientQuantity увеличивает количество ингредиента', () => {
            const pizzaStore = usePizzaStore();
            pizzaStore.addIngredient(1);
            pizzaStore.incrementIngredientQuantity(1);

            expect(pizzaStore.ingredients[0].quantity).toBe(2);
        });

        it('Проверка, что действие incrementIngredientQuantity добавляет ингредиент, если его нет в списке', () => {
            const pizzaStore = usePizzaStore();
            pizzaStore.incrementIngredientQuantity(2);

            expect(pizzaStore.ingredients).toEqual([{ ingredientId: 2, quantity: 1 }]);
        });
    });

    describe('action: setIngredientQuantity', () => {
        it('Проверка, что действие setIngredientQuantity изменяет количество ингредиента', () => {
            const pizzaStore = usePizzaStore();
            pizzaStore.addIngredient(1);
            pizzaStore.setIngredientQuantity(1, 5);

            expect(pizzaStore.ingredients[0].quantity).toBe(5);
        });

        it('Проверка, что действие setIngredientQuantity удаляет ингредиент, если количество 0', () => {
            const pizzaStore = usePizzaStore();
            pizzaStore.addIngredient(1);
            pizzaStore.setIngredientQuantity(1, 0);

            expect(pizzaStore.ingredients).toEqual([]);
        });
    });

    describe('action: removeIngredient', () => {
        it('Проверка, что действие removeIngredient удаляет ингредиент из списка', () => {
            const pizzaStore = usePizzaStore();
            pizzaStore.addIngredient(1);
            pizzaStore.removeIngredient(1);

            expect(pizzaStore.ingredients).toEqual([]);
        });
    });

    describe('action: loadPizza', () => {
        it('Проверка, что действие loadPizza загружает данные пиццы', () => {
            const pizzaStore = usePizzaStore();
            const pizza = {
                index: 1,
                name: 'Pepperoni',
                sauceId: 1,
                doughId: 2,
                sizeId: 3,
                ingredients: [{ ingredientId: 1, quantity: 2 }],
            };

            pizzaStore.loadPizza(pizza);

            expect(pizzaStore.index).toBe(1);
            expect(pizzaStore.name).toBe('Pepperoni');
            expect(pizzaStore.sauceId).toBe(1);
            expect(pizzaStore.doughId).toBe(2);
            expect(pizzaStore.sizeId).toBe(3);
            expect(pizzaStore.ingredients).toEqual([{ ingredientId: 1, quantity: 2 }]);
        });
    });
});
