<template>
    <UIButton @click="qrExport">qr export data</UIButton>
    <UIButton @click="qrImport">read qr</UIButton> phase is {{ phase }} <br/>
    <template v-if="phase === 'export'">
        <FountainCode :data="testingData" :dialog="true" :cancel="() => phase = ''"/>
    </template>
    <template v-else-if="phase === 'import'">
        import {{ data }}
        <FountainReader :callback="(a) => {data = a}" :cancel="() => phase = ''"/>
    </template>
</template>

<style>
    canvas {
        width: 400px;
        height: 400px;
    }
    .qrStream {
        max-width: 400px;
    }
</style>

<script>
    export default {
        props: {
            
        },
        data() {
            return {
                phase: '',
                data: '',

                testingData:  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris est dui, sollicitudin nec auctor id, bibendum eget lorem. Nam sit amet condimentum lectus. Cras rutrum vitae lectus a semper. Praesent pellentesque nisl eget augue finibus, a consectetur ante dapibus. Mauris pulvinar sagittis risus, vitae hendrerit enim accumsan id. Donec ullamcorper posuere ligula at tincidunt. Interdum et malesuada fames ac ante ipsum primis in faucibus.

Proin a sapien sed mi sodales sagittis vitae sed nisl. Quisque viverra dignissim diam, vitae faucibus ipsum maximus sed. Ut pharetra mauris eu justo molestie luctus. Praesent eu odio et mi faucibus bibendum quis eu metus. Morbi semper rutrum ullamcorper. Phasellus sed sem gravida, condimentum lectus sit amet, feugiat erat. Sed accumsan nibh mi, et vulputate libero volutpat tristique.

Donec ante enim, convallis eu justo in, lobortis gravida eros. Duis non placerat purus, sed rutrum arcu. Duis finibus ante quam, vitae congue velit ullamcorper sed. Suspendisse ipsum purus, pretium a pulvinar aliquet, dictum bibendum ante. Morbi eget placerat enim, vel tristique purus. Donec commodo venenatis tortor vel pulvinar. Mauris id mi rhoncus metus pellentesque porta. Duis auctor tincidunt dolor, iaculis ornare magna ornare ac. Donec quis libero eu nunc tempor suscipit quis eu neque. Etiam sodales ligula et purus bibendum, non convallis dui mattis. Nullam pulvinar magna in facilisis suscipit. Ut eu porta arcu, eu sollicitudin dolor. Quisque non magna elit. Morbi ultrices urna id condimentum dapibus.

Quisque pharetra interdum sapien, a dignissim augue blandit quis. Mauris bibendum quam id metus aliquet, in finibus tellus pellentesque. Ut sollicitudin placerat efficitur. Curabitur porttitor urna vitae commodo dapibus. Nam quis tristique arcu. Nullam accumsan, nisi ac dapibus maximus, ipsum sapien porta sem, vitae tristique diam lectus in dui. Quisque tincidunt rutrum lacinia.

Proin in ligula justo. Curabitur in pretium ante. Vestibulum imperdiet luctus risus, id tempor sem maximus vitae. Maecenas risus lorem, convallis non porta blandit, maximus venenatis eros. Cras diam nisi, cursus et finibus eget, vulputate a orci. Quisque sed mi sit amet nunc consequat porta. Pellentesque maximus leo mi, hendrerit iaculis nulla egestas nec. In sed erat lobortis, hendrerit mauris tincidunt, sodales metus. Phasellus ac tincidunt lacus, dapibus viverra elit. Suspendisse dui ex, suscipit quis felis eu, pellentesque volutpat lectus. Sed et felis sed libero tempus lobortis.

Phasellus sed elit ut nisl faucibus iaculis. Duis laoreet scelerisque velit et tincidunt. Nullam posuere turpis eget purus gravida consectetur. Nulla sagittis porta elit, nec porttitor leo. Sed at est ac risus hendrerit lacinia. Fusce tincidunt convallis nunc, et hendrerit nisi. In ante nibh, commodo eget scelerisque quis, tincidunt at diam. Nullam porttitor sapien urna, fringilla hendrerit lorem iaculis nec. Pellentesque ut nisl maximus, tempor lectus cursus, elementum odio. Nam aliquet diam vitae tellus ullamcorper semper.

Sed at metus nisl. Vivamus lobortis lacus quis tempor consectetur. Aliquam erat volutpat. Donec non arcu sed metus consectetur hendrerit. Integer ex sapien, mattis id massa id, viverra eleifend dolor. Aliquam eget nibh et erat consequat pulvinar. Proin sed leo lacinia, lacinia tellus sed, posuere dui. Aenean ullamcorper aliquam ligula, a faucibus magna tristique non. Quisque iaculis urna vitae est convallis, quis placerat orci finibus. In hac habitasse platea dictumst. Donec ac porttitor lectus, non lobortis lectus. Donec nec porttitor odio. Proin condimentum, sapien at tincidunt aliquam, tellus ex molestie sapien, et porttitor augue ligula ac purus. Phasellus odio ante, gravida vel interdum eget, vulputate ut quam. Curabitur et ornare tellus, ut consectetur nulla. Phasellus eu ligula ac urna dignissim luctus.

Duis nec augue nec lectus ultricies elementum. Cras tristique imperdiet finibus. Aenean ornare, nisi ac cursus commodo, enim enim pharetra justo, rhoncus laoreet ante neque eget quam. Donec quis ligula id mauris ornare venenatis volutpat ac leo. In vehicula imperdiet nisi ac tempor. In at porttitor elit. Nunc vitae nisi at est efficitur faucibus mattis a metus. Vestibulum ullamcorper ligula imperdiet leo ornare tempus. Morbi lacinia ornare massa, vestibulum interdum leo rhoncus a. In eget nisl semper, posuere sapien nec, luctus nisi. Nullam turpis odio, rutrum eu ultricies vel, mollis nec arcu. Pellentesque dictum eros et est rutrum, non egestas augue cursus. Duis volutpat leo metus, vel luctus tortor consequat in.

Nunc venenatis, sem malesuada mollis pretium, orci dui mollis augue, at vehicula dui lorem ac diam. Sed eget elementum felis. Praesent eu arcu vel arcu finibus lobortis. Cras rhoncus est purus, non lacinia sapien feugiat nec. Sed sagittis sem id molestie finibus. Aenean augue metus, tempor sed augue eget, dapibus volutpat odio. Curabitur laoreet maximus elit, vel sodales est placerat non. Vestibulum consectetur laoreet interdum.

Aliquam aliquet eros et magna rhoncus pulvinar. Curabitur sed tempus libero. Nulla nisi odio, tempus hendrerit nulla a, sodales dapibus ipsum. Ut in metus blandit, rutrum enim et, maximus nibh. Cras non tincidunt odio, in iaculis quam. Quisque molestie commodo ullamcorper. Proin dictum rutrum dignissim. Duis eleifend leo et erat vehicula tristique a ut urna. Nunc tincidunt sed tellus at sodales. Sed eu erat nec lectus ultricies accumsan at quis eros. Sed pretium ut tellus sed tempor. Suspendisse potenti. Integer ac risus at odio elementum ultrices vitae at mi.

Vestibulum posuere in metus a rutrum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ut rutrum purus. Duis nulla ante, gravida ut vulputate sit amet, tempor ac turpis. Etiam non elit tellus. Nunc non convallis dui. Sed venenatis quam nisi, quis fringilla erat elementum vel. Duis vitae ullamcorper enim. Aliquam efficitur commodo consequat. Nunc elementum luctus dolor id eleifend. Fusce efficitur nisi et ex interdum consectetur. Aenean et ligula ipsum. Vivamus eget finibus massa, aliquam lacinia velit. Suspendisse a elit ante.

Mauris ac sapien sollicitudin, posuere quam quis, vestibulum diam. Nullam scelerisque, justo a vestibulum aliquet, purus nisl dignissim ante, a luctus libero erat sit amet turpis. Nulla facilisi. Pellentesque vel risus mattis, venenatis lectus in, consectetur lorem. Donec nec dui non purus aliquet semper vitae dictum diam. Etiam quis purus non urna mattis fringilla ut vitae sem. Maecenas accumsan accumsan ex sit amet mollis. Phasellus fringilla consequat gravida. Pellentesque ullamcorper mollis tincidunt. Duis nec convallis nisi. Pellentesque enim nunc, interdum eget tellus ut, bibendum venenatis tellus. Praesent dapibus quam et viverra posuere. Vestibulum at ante quis mauris sagittis sodales. Integer tempus tempor arcu, vitae posuere nisi posuere a. Aenean eu feugiat dolor. Nunc ut erat placerat, egestas lectus in, pellentesque lorem.

Cras maximus, dolor ac tincidunt iaculis, tortor lectus ullamcorper augue, ultricies luctus sapien neque non est. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sollicitudin nisl nec massa posuere cursus. Nam eu cursus augue. Morbi vel ultrices nunc. Morbi molestie nibh arcu, vehicula facilisis purus tempus quis. Nulla non aliquam felis. Pellentesque id diam non metus commodo volutpat at pharetra mauris. Proin ut nunc porta, dictum lorem eget, consequat est. Vivamus sodales rhoncus quam, a hendrerit risus viverra id. Sed a lorem mi. Phasellus commodo quis dui eu accumsan.

Nunc accumsan volutpat erat quis ultrices. Aliquam eget nibh auctor, mattis libero non, interdum nunc. Duis lorem erat, consectetur sit amet interdum at, accumsan eget sapien. Suspendisse consectetur feugiat dolor lobortis dictum. Sed maximus, lacus vulputate euismod euismod, quam mi tristique mauris, posuere vestibulum est neque eu tortor. Mauris et diam metus. Suspendisse urna mi, sagittis sit amet urna quis, mollis varius lorem. Nam eu purus volutpat, rhoncus tellus in, placerat urna. Etiam blandit finibus urna, in tempus elit pharetra fringilla. In hac habitasse platea dictumst. Suspendisse at feugiat ante. Aliquam at urna in sapien tempus mattis. Donec ut nunc varius, dapibus elit vitae, aliquet lorem. Etiam pharetra sem vel libero rutrum, id posuere tellus facilisis. Etiam gravida lacinia odio, a efficitur diam placerat id. Cras diam est, euismod non faucibus in, semper sit amet diam.

Donec sodales enim nulla, consequat egestas quam sollicitudin ac. Aenean id eros porta, laoreet risus ut, faucibus elit. Mauris tellus elit, dignissim non purus vel, fermentum commodo orci. Duis vel venenatis neque, a euismod lacus. Mauris placerat eros quis dolor vulputate blandit. Etiam eget nunc eu mauris fringilla eleifend quis eu erat. Nullam sed orci enim. Morbi accumsan vulputate diam sed euismod.

Aliquam lacinia, erat in molestie suscipit, lorem risus ultricies justo, et condimentum libero mauris id velit. Duis eros nulla, varius in tincidunt id, congue a diam. Suspendisse interdum convallis quam nec consectetur. Quisque hendrerit luctus diam a eleifend. Curabitur vehicula tempus neque. Sed massa ante, fermentum sit amet urna sit amet, cursus scelerisque risus. Suspendisse lectus tellus, rhoncus id bibendum quis, dictum sit amet justo. Vivamus at dignissim felis, ac vulputate mauris. Ut in massa metus. Etiam bibendum nisl id magna viverra rhoncus. Duis mauris lorem, tempor pellentesque metus et, faucibus placerat elit. Integer tincidunt suscipit ipsum ut consequat. In tempus malesuada metus id congue. Quisque laoreet porttitor dui at euismod. Aliquam non sapien eu turpis fermentum elementum. Aenean vitae tellus odio.

Etiam quam eros, faucibus id nisi eu, lacinia volutpat nisi. Etiam et vulputate velit, ac luctus leo. Curabitur accumsan porttitor nisi sed finibus. Donec congue metus in placerat rutrum. Curabitur sed dui est. Maecenas eu ultrices diam. Sed vel tincidunt neque. Pellentesque mollis nunc volutpat, hendrerit tortor vel, egestas nisi. Quisque eu lacinia sem, eget pellentesque nunc. Sed sed urna eget quam molestie cursus. Suspendisse porttitor finibus tincidunt. Ut dui dui, fermentum quis risus eget, faucibus ultrices est. Sed vehicula suscipit erat nec dapibus.

Vestibulum scelerisque ligula ligula, eget eleifend nisi scelerisque vitae. Mauris id tellus tempus, venenatis ante at, volutpat sapien. Maecenas id vulputate purus, ac tincidunt neque. Maecenas id ante placerat arcu tempus congue. Phasellus id quam eget quam efficitur fringilla. Nam et laoreet diam. Morbi finibus mattis posuere. Integer metus enim, pulvinar quis suscipit a, mollis vel justo. Curabitur in sapien quis tortor consequat molestie quis et quam. Cras non velit vel dolor sollicitudin ultricies eu eget odio. Nunc ornare, urna eu iaculis malesuada, ante sem cursus sem, vel pulvinar ante diam eget nisl. Nam ultrices, felis sed elementum convallis, eros arcu sodales est, eget tincidunt nisi purus a ipsum. Quisque tempor, arcu id tempor consequat, magna elit ultricies augue, sit amet bibendum odio ex et nisi. Morbi varius erat id ipsum volutpat, a vestibulum lorem dapibus.

Vestibulum leo dolor, luctus nec sapien ac, cursus vehicula mauris. Proin ornare eros ante, vitae gravida ligula elementum auctor. Donec et ante eu dolor mollis venenatis a at augue. Integer in lectus nec tortor finibus porta in non lorem. Duis enim ante, hendrerit in fermentum non, maximus accumsan diam. Nam a molestie magna. Pellentesque posuere massa felis, feugiat euismod diam egestas sed. Nullam et dolor tristique, euismod erat vel, sodales eros. Integer cursus, risus sed interdum ultrices, nisl quam consectetur lectus, sed interdum velit sem non tortor. Pellentesque vitae nibh egestas, ultricies eros eu, scelerisque arcu.

Cras sit amet felis quis nibh gravida ultrices. Suspendisse a ante diam. Aliquam ligula metus, dapibus eget malesuada at, viverra ultrices odio. Proin gravida risus nec finibus tempor. Pellentesque vitae porttitor odio. Aliquam erat volutpat. Quisque pulvinar fermentum nisi nec consectetur. Aenean odio turpis, auctor eget mauris at, condimentum elementum felis. Vivamus egestas dui ante, at suscipit libero suscipit eget. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras vel tempus est, a ultricies est. Nullam rutrum felis vel erat iaculis consectetur. Donec malesuada in nisi nec accumsan. Sed a orci scelerisque, vestibulum massa id, posuere est. Sed rhoncus sem vitae nisi consectetur placerat. Duis tempor mauris tristique vestibulum fermentum.

Donec malesuada sapien vel mauris porttitor, nec pellentesque arcu euismod. Morbi et porta mi, lacinia tincidunt nisl. Duis ligula dolor, consequat id vulputate ac, auctor a quam. Quisque nec malesuada elit. Aliquam sit amet neque neque. Ut diam erat, fringilla vel volutpat vitae, suscipit at nisi. Praesent ipsum mi, posuere quis elit at, ullamcorper iaculis arcu. Praesent accumsan consequat erat eu venenatis. Nam et tellus mollis neque scelerisque tincidunt interdum dapibus lorem. Proin mollis massa quis magna cursus, ac bibendum nisi bibendum. Maecenas porttitor blandit nunc, sit amet lobortis leo sollicitudin vel. Integer at orci in nunc accumsan varius.

Suspendisse in ultrices enim. Ut velit quam, elementum quis lorem commodo, molestie dignissim augue. Integer eget bibendum urna, ut sagittis odio. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus nec eros venenatis nisl accumsan fringilla at a turpis. Donec at mi at elit molestie lacinia pulvinar in ante. Mauris vehicula nunc urna, id vehicula nisi ullamcorper rhoncus. Ut at nisi porta, facilisis sem et, fringilla odio. Duis et nunc rutrum dui hendrerit convallis nec sit amet diam. Integer consequat viverra finibus. Suspendisse et ullamcorper nisi. Maecenas convallis, elit a viverra pulvinar, ligula tellus ultrices magna, at molestie tellus lacus nec libero. Nullam eu sem libero. Cras egestas scelerisque augue, id porta nulla pulvinar ac.

Vestibulum efficitur lorem ante, pulvinar fringilla dui euismod at. Donec sit amet felis sed elit congue gravida. Aenean viverra tellus dapibus erat venenatis vestibulum. Proin purus metus, convallis quis tortor eu, maximus consequat velit. Sed sagittis urna id risus lobortis, non volutpat enim aliquet. Cras quis auctor justo, sed aliquet justo. Mauris facilisis ligula ut est cursus, sed sollicitudin purus dapibus. Quisque eu sapien convallis, tempus lacus a, condimentum orci. Sed a nisi a erat tincidunt pellentesque non nec neque. Curabitur massa lorem, tristique eu erat ac, efficitur eleifend enim. Vivamus sit amet nibh ultrices, consequat dolor id, convallis nisi. Duis sed varius eros. Aliquam erat volutpat. Nam in justo viverra, bibendum nisl non, ullamcorper odio. Phasellus nunc erat, egestas sit amet hendrerit a, consectetur nec lacus.

Praesent sit amet orci vel mi tempus venenatis id a ligula. In rhoncus non purus nec commodo. Praesent luctus ipsum vel ipsum laoreet varius. Nam consectetur arcu nibh, sit amet fringilla lacus malesuada et. Etiam facilisis justo a lobortis mollis. Phasellus nec leo blandit, imperdiet lectus sit amet, faucibus nisl. Sed sagittis ipsum ut nisi maximus, in ornare neque porttitor. Ut metus lectus, aliquam vitae sem quis, rutrum convallis massa. Nam auctor venenatis urna, a sollicitudin enim tristique sagittis. Morbi ultrices, nisi in dictum pellentesque, nunc sem sodales ipsum, nec egestas eros nisl quis urna. In enim diam, ornare id efficitur sed, sodales a nibh. Pellentesque tortor lorem, tincidunt a sodales vel, rutrum sit amet elit. In hac habitasse platea dictumst. Nam a ante enim. Proin a enim a ligula dignissim consequat.

Aenean mattis ultricies sollicitudin. Curabitur eros justo, volutpat feugiat elementum a, consequat quis tellus. Maecenas sagittis est risus, a luctus sem venenatis in. Sed maximus id est ut sodales. Integer dapibus sollicitudin tortor, sit amet malesuada purus pellentesque id. Nulla volutpat, diam non laoreet commodo, dolor sem mollis leo, id commodo quam justo quis lacus. Curabitur maximus dignissim massa, sit amet consequat odio porta imperdiet. Donec accumsan dictum urna. Curabitur at turpis vel felis luctus sodales. Nulla imperdiet hendrerit felis, sit amet auctor tellus cursus nec.

Nullam vestibulum efficitur dui sed mattis. Ut vehicula libero nec lectus egestas mollis. Duis malesuada lectus eget erat cursus aliquam. Suspendisse tincidunt varius mi, sed ultrices sapien congue sed. Nunc rhoncus hendrerit felis, vitae tempus tortor iaculis a. In magna libero, facilisis sit amet mi ac, volutpat convallis mi. Aliquam erat volutpat. Aenean sagittis quis lacus vel ultricies. Nunc metus ante, interdum sed viverra quis, tincidunt at justo. Nullam porta lorem sed justo rutrum, et cursus tellus suscipit. Nulla tempus libero eget nulla tristique, vitae accumsan elit fringilla. Vestibulum dignissim ornare libero sed imperdiet. Cras faucibus mollis ante, lacinia vestibulum quam egestas placerat. Nulla viverra quam nibh, a fringilla est imperdiet at. Nam sed commodo orci, a fringilla dui. Maecenas aliquet ligula quam, sit amet euismod purus interdum et.

Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer purus nisi, auctor in feugiat tristique, sodales lacinia magna. Curabitur elementum, mauris sed fringilla tincidunt, ipsum dolor finibus erat, eu accumsan ante mi porttitor nisl. Suspendisse quis nisl eget erat aliquet pulvinar sed et est. Aenean facilisis metus dui, pulvinar vehicula turpis pellentesque convallis. Nam consequat ultricies nunc, non ultrices libero sagittis porta. Nulla porta mi nisi, in cursus nisi porttitor et. Fusce vitae nunc id quam congue volutpat. Phasellus a tellus et odio hendrerit iaculis. Nunc mauris purus, facilisis non tempor in, fringilla in nunc. Curabitur eget nibh leo. Aenean interdum tortor ut ultrices varius. Mauris nec gravida felis. Phasellus velit arcu, laoreet a tincidunt eu, elementum id sapien.

Maecenas sit amet metus tellus. Duis faucibus dui eros, quis ornare tortor laoreet vitae. Donec vitae aliquam elit. Phasellus et ante eget nisi ultricies volutpat sit amet eget felis. Aenean urna lorem, ornare sed metus faucibus, condimentum dignissim urna. Proin dapibus, tellus eget posuere dictum, dui nulla placerat quam, vitae volutpat lectus ipsum sit amet sem. Ut ut posuere ligula, ac mollis lectus. Aenean non metus non ante luctus venenatis. Suspendisse eu orci eu felis ultrices feugiat sed et neque. Integer elementum varius turpis, et lobortis urna luctus sed. Phasellus scelerisque nisi elit, eu gravida neque fermentum congue.

Phasellus ultricies molestie mollis. Nam sit amet lacinia mauris. Vestibulum hendrerit fringilla urna, auctor blandit nulla viverra eget. Fusce vel varius arcu, non consectetur arcu. Phasellus ullamcorper, lectus eu vulputate ullamcorper, nunc nisi convallis augue, ac ultricies mauris velit in turpis. Curabitur nec velit mattis, tempus odio vel, iaculis eros. Mauris vel leo vitae lectus egestas ullamcorper vitae eu ex.

Suspendisse ac turpis leo. Sed in posuere justo. Curabitur tellus purus, ultrices et magna sit amet, ullamcorper rhoncus diam. Integer placerat sollicitudin purus at mollis. In condimentum elit at hendrerit imperdiet. Aenean sit amet purus commodo, lacinia ligula vitae, viverra orci. Aliquam ipsum purus, placerat in sapien in, pulvinar consequat augue. Nam mauris elit, luctus sit amet lorem sed, lobortis tempus libero. Vestibulum eu magna sit amet justo ultricies interdum vel vel massa. Mauris ultricies scelerisque fringilla. Aenean volutpat augue ut nisl pulvinar pharetra. Curabitur mattis erat at lectus blandit, euismod mollis diam suscipit. Ut in ultricies orci. Quisque pulvinar enim ac euismod placerat. Nam quis elit quis eros consectetur lacinia sed vitae dui. In sit amet volutpat ex, ut convallis turpis. Ut facilisis bibendum ante non aliquet porttitor.
` 

            }
        },
        mounted() {
        },
        unmounted() {
            
        },
        methods: {
            qrExport() {
                this.phase = 'export'
            },
            qrImport() {
                this.qrFrames = null
                this.phase = 'import'
            },
        }
    }
</script>