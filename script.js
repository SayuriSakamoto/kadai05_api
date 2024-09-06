const apiKey = '..'; // 楽天APIキー
const apiUrl = 'https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426'; // カテゴリランキングエンドポイント

$('#searchButton').on('click', function() {
    const ingredients = $('#ingredients').val().toLowerCase();
    if (ingredients === '') {
        alert('材料を入力してください');
        return;
    }

    // APIリクエストのURLを作成
    const url = `${apiUrl}?applicationId=${apiKey}&keyword=${encodeURIComponent(ingredients)}`;

    // APIリクエストを実行
    $.getJSON(url, function(data) {
        console.log(data); // レスポンスをコンソールに出力して確認
        filterAndDisplayRecipes(data.result);
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.error('APIエラー:', textStatus, errorThrown); // エラー詳細をコンソールに出力
        alert('レシピを取得できませんでした。');
    });
});

function filterAndDisplayRecipes(recipes) {
    const recipesContainer = $('#recipes');
    recipesContainer.empty(); // 前の検索結果をクリア

    if (!recipes || recipes.length === 0) {
        recipesContainer.append('<p>レシピが見つかりませんでした。</p>');
        return;
    }

    // レシピを表示
    recipes.forEach(function(recipe) {
        const recipeElement = `
            <div class="recipe">
                <h3>${recipe.recipeTitle}</h3>
                <img src="${recipe.foodImageUrl}" alt="${recipe.recipeTitle}">
                <p>${recipe.recipeDescription}</p>
            </div>
        `;
        recipesContainer.append(recipeElement);
    });
}
